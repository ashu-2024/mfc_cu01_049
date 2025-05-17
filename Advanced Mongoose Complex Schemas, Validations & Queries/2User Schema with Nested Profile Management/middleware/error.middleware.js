const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === 11000) {
    return res.status(400).json({ error: "Duplicate email not allowed" });
  }

  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
