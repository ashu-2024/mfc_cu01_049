const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "..", "db.json");

function readTodos() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data).todos;
}

function writeTodos(todos) {
  fs.writeFileSync(dbPath, JSON.stringify({ todos }, null, 2));
}

module.exports = { readTodos, writeTodos };
