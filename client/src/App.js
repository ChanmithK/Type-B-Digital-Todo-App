import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [editingTodo, setEditingTodo] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data.data);
    } catch (err) {
      setError("Failed to fetch todos. Please try again.");
      console.error("Fetch todos error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form and editing state
  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setEditingTodo(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    setSubmitLoading(true);
    setError("");

    try {
      if (editingTodo) {
        // Update existing todo
        const response = await axios.put(
          `${API_BASE_URL}/todos/${editingTodo._id}`,
          formData
        );

        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === editingTodo._id ? response.data.data : todo
          )
        );
      } else {
        // Create new todo
        const response = await axios.post(`${API_BASE_URL}/todos`, formData);
        setTodos((prev) => [response.data.data, ...prev]);
      }

      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Failed to ${
            editingTodo ? "update" : "create"
          } todo. Please try again.`
      );
      console.error("Submit error:", err);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Toggle todo completion
  const handleToggleDone = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/todos/${id}/done`);

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data.data : todo))
      );
    } catch (err) {
      setError("Failed to update todo status. Please try again.");
      console.error("Toggle done error:", err);
    }
  };

  // Handle todo deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error("Delete error:", err);
    }
  };

  // Handle todo editing
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>My TODO App</h1>
          <p>Manage your tasks efficiently</p>
        </header>

        {/* Todo Form */}
        <div className="todo-form-section">
          <h2>{editingTodo ? "Edit Todo" : "Add New Todo"}</h2>
          <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter todo title"
                maxLength="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter todo description (optional)"
                maxLength="500"
                rows="3"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button
                type="submit"
                disabled={submitLoading}
                className="btn btn-primary"
              >
                {submitLoading
                  ? "Saving..."
                  : editingTodo
                  ? "Update Todo"
                  : "Add Todo"}
              </button>

              {editingTodo && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Todo List */}
        <div className="todo-list-section">
          <div className="section-header">
            <h2>My Todos ({todos.length})</h2>
            <button
              onClick={fetchTodos}
              disabled={loading}
              className="btn btn-outline"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {loading && <div className="loading">Loading todos...</div>}

          {!loading && todos.length === 0 && (
            <div className="empty-state">
              <p>No todos found. Add your first todo above!</p>
            </div>
          )}

          <div className="todo-list">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className={`todo-item ${todo.done ? "done" : ""}`}
              >
                <div className="todo-content">
                  <div className="todo-header">
                    <h3 className="todo-title">{todo.title}</h3>
                    {/* Toggle Switch moved to top right */}
                    <div className="todo-status-controls">
                      <div className="toggle-switch-container">
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => handleToggleDone(todo._id)}
                          />
                          <span className="slider"></span>
                        </label>
                        <span className="toggle-label">
                          {todo.done ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {todo.description && (
                    <p className="todo-description">{todo.description}</p>
                  )}

                  {/* Action buttons moved to bottom */}
                  <div className="todo-actions-bottom">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="btn btn-sm btn-info"
                      title="Edit todo"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="btn btn-sm btn-danger"
                      title="Delete todo"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="todo-meta">
                    <span className="todo-date">
                      Created: {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                    {todo.updatedAt !== todo.createdAt && (
                      <span className="todo-date">
                        Updated: {new Date(todo.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
