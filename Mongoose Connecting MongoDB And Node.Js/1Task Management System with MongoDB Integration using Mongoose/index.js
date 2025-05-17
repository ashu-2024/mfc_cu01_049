const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/TaskDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  dueDate: Date,
});

const Task = mongoose.model("Task", taskSchema);

async function createTask(data) {
  const task = new Task(data);
  return await task.save();
}

async function getTasks(filter = {}) {
  return await Task.find(filter);
}

async function updateTask(id, data) {
  return await Task.findByIdAndUpdate(id, data, { new: true });
}

async function deleteTask(id) {
  return await Task.findByIdAndDelete(id);
}

module.exports = { createTask, getTasks, updateTask, deleteTask, Task };
