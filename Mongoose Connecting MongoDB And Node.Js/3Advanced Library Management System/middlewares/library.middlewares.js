const Library = require("../models/library.model");

async function validateBookData(req, res, next) {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Incomplete Data" });
  }
  next();
}

async function checkBorrowLimit(req, res, next) {
  const borrowerName = req.body.borrowerName;
  if (!borrowerName) {
    return res.status(400).json({ error: "Borrower name required" });
  }
  const borrowedCount = await Library.countDocuments({
    borrowerName,
    status: "borrowed",
  });
  if (borrowedCount >= 3) {
    return res.status(409).json({ error: "Borrowing limit exceeded (3 books max)" });
  }
  next();
}
module.exports = { validateBookData, checkBorrowLimit };
