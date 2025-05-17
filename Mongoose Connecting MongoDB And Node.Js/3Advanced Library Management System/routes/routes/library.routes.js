const express = require("express");
const router = express.Router();
const {
  addBook,
  borrowBook,
  returnBook,
  getBooks,
  deleteBook,
} = require("../controllers/library.controller");
const { validateBookData, checkBorrowLimit } = require("../middleware/library.middleware");

router.post("/library/books", validateBookData, addBook);
router.patch("/library/borrow/:id", checkBorrowLimit, borrowBook);
router.patch("/library/return/:id", returnBook);
router.get("/library/books", getBooks);
router.delete("/library/books/:id", deleteBook);

module.exports = router;
