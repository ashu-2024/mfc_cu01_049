const Library = require("../models/library.model");

async function addBook(req, res) {
  try {
    const { title, author } = req.body;
    const newBook = new Library({ title, author, status: "available" });
    await newBook.save();
    res.status(201).json({ message: "Book added", book: newBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function borrowBook(req, res) {
  try {
    const bookId = req.params.id;
    const { borrowerName } = req.body;

    const book = await Library.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.status !== "available") {
      return res.status(409).json({ error: "Book is not available to borrow" });
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);

    book.status = "borrowed";
    book.borrowerName = borrowerName;
    book.borrowDate = borrowDate;
    book.dueDate = dueDate;
    book.returnDate = null;
    book.overdueFees = 0;

    await book.save();

    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function returnBook(req, res) {
  try {
    const bookId = req.params.id;
    const book = await Library.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.status !== "borrowed") {
      return res.status(409).json({ error: "Book is not currently borrowed" });
    }

    const returnDate = new Date();
    let overdueFees = 0;

    if (book.dueDate && returnDate > book.dueDate) {
      const diffTime = Math.ceil((returnDate - book.dueDate) / (1000 * 60 * 60 * 24)); // days overdue
      overdueFees = diffTime * 10; // Rs. 10 per day
    }

    book.status = "available";
    book.borrowerName = null;
    book.borrowDate = null;
    book.dueDate = null;
    book.returnDate = returnDate;
    book.overdueFees = overdueFees;

    await book.save();

    res.status(200).json({ message: "Book returned successfully", overdueFees, book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBooks(req, res) {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.title) filter.title = { $regex: req.query.title, $options: "i" };

    const books = await Library.find(filter);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteBook(req, res) {
  try {
    const bookId = req.params.id;
    const book = await Library.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.status === "borrowed") {
      return res.status(409).json({ error: "Cannot delete borrowed book" });
    }
    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addBook, borrowBook, returnBook, getBooks, deleteBook };
