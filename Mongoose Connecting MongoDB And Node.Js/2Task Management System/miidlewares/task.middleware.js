const allowedPriorities = ["low", "medium", "high"];

async function validateTaskData(req, res, next) {
  const { title, description, priority } = req.body;
  if (!title || !description || !priority) {
    return res.status(400).json({ error: "Incomplete Data Received" });
  }
  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({ error: "Invalid priority value" });
  }
  next();
}

async function validateUpdateData(req, res, next) {
  const { priority } = req.body;
  if (priority && !allowedPriorities.includes(priority)) {
    return res.status(400).json({ error: "Invalid priority value" });
  }
  next();
}

module.exports = { validateTaskData, validateUpdateData };
