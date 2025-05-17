const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTasks } = require("../controllers/task.controller");
const { validateTaskData, validateUpdateData } = require("../middleware/task.middleware");

router.post("/tasks", validateTaskData, createTask);
router.get("/tasks", getTasks);
router.patch("/tasks/:id", validateUpdateData, updateTask);
router.delete("/tasks", deleteTasks);

module.exports = router;
