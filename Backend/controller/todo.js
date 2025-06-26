import Todo from "../model/todo.js";

// Create a new todo
export async function createTodo(req, res) {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Get all todos
export async function getTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.status(200).send({ todos });
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get a todo by ID
export async function getTodoById(req, res) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
}
// Update a todo by ID
export async function updateTodo(req, res) {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
}
// Delete a todo by ID
export async function deleteTodo(req, res) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
}
// Mark a todo as completed
export async function completeTodo(req, res) {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
}

export default {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  completeTodo
};
