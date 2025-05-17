const Task = require("../models/task.model");

async function createTask(req, res) {
  try {
    const { title, description, priority, dueDate } = req.body;
    const existing = await Task.findOne({ title });
    if (existing) return res.status(400).json({ error: "Title must be unique" });

    const task = new Task({ title, description, priority, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getTasks(req, res) {
  try {
    const filter = {};
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.status) {
      if (req.query.status === "completed") filter.isCompleted = true;
      else if (req.query.status === "pending") filter.isCompleted = false;
    }
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateTask(req, res) {
  try {
    const updates = {};
    const { title, description, priority, isCompleted } = req.body;

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (priority) updates.priority = priority;
    if (typeof isCompleted === "boolean") {
      updates.isCompleted = isCompleted;
      if (isCompleted) updates.completionDate = new Date();
      else updates.completionDate = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.json(updatedTask);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteTasks(req, res) {
  try {
    const { priority } = req.query;
    if (!priority) return res.status(400).json({ error: "Priority query param required" });
    const result = await Task.deleteMany({ priority });
    res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { createTask, getTasks, updateTask, deleteTasks };
