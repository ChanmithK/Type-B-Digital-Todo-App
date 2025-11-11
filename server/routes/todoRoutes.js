const express = require("express");
const router = express.Router();

const {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodoDone,
  deleteTodo,
} = require("../controllers/todoController");

// Get all todos / Create new todo
router.get("/", getTodos);
router.post("/", createTodo);

// Update / Delete todo by ID
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

// Toggle todo done status
router.patch("/:id/done", toggleTodoDone);

module.exports = router;
