const express = require("express");

const Todo = require("../model/todo");

const router = express.Router();
const {
  completeTodo,
  deleteTodo,
  createTodo,
  getTodos,
  getTodoById,
  updateTodo
} = require("../controller/todo");

router.put("/:id/complete", completeTodo);
router.delete("/:id", deleteTodo);
router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);

module.exports = router;
