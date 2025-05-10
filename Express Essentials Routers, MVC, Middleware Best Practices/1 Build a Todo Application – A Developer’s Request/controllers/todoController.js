const { readTodos, writeTodos } = require("../models/todoModel");

const getAllTodos = (req, res) => {
  res.status(200).json(readTodos());
};

const createTodo = (req, res) => {
  const todos = readTodos();
  const newTodo = { id: Date.now(), ...req.body };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const todos = readTodos();
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });
  todos[index] = { ...todos[index], ...req.body };
  writeTodos(todos);
  res.status(200).json(todos[index]);
};

const deleteTodo = (req, res) => {
  const todos = readTodos();
  const id = parseInt(req.params.id);
  const filtered = todos.filter((t) => t.id !== id);
  if (todos.length === filtered.length)
    return res.status(404).json({ message: "Todo not found" });
  writeTodos(filtered);
  res.status(200).json({ message: "Deleted successfully" });
};

const searchTodos = (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const todos = readTodos();
  const results = todos.filter((t) => t.title.toLowerCase().includes(q));
  if (results.length === 0)
    return res.status(404).json({ message: "No matching todos found" });
  res.status(200).json(results);
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  searchTodos,
};
