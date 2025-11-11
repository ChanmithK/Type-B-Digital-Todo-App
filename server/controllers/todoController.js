const Todo = require("../models/todo");

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching todos",
      error: error.message,
    });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const todo = new Todo({
      title: title.trim(),
      description: description ? description.trim() : "",
    });

    const savedTodo = await todo.save();

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: savedTodo,
    });
  } catch (error) {
    console.error("Create todo error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating todo",
      error: error.message,
    });
  }
};

// Update an existing todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    todo.title = title.trim();
    todo.description = description ? description.trim() : "";

    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Update todo error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid todo ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating todo",
      error: error.message,
    });
  }
};

// Toggle todo done status
const toggleTodoDone = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    todo.done = !todo.done;
    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      message: `Todo marked as ${updatedTodo.done ? "done" : "undone"}`,
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Toggle todo error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid todo ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating todo status",
      error: error.message,
    });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: { id },
    });
  } catch (error) {
    console.error("Delete todo error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid todo ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while deleting todo",
      error: error.message,
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodoDone,
  deleteTodo,
};
