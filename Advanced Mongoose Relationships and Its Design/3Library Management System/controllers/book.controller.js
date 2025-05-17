const Book = require("../models/book.model");
const Member = require("../models/member.model");

// Add a book
exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ error: "Title and author are required" });

    const book = new Book({ title, author });
    await book.save();

    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update book details
exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const updates = req.body;

    const book = await Book.findByIdAndUpdate(bookId, updates, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book updated", book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete book & remove from members
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // Remove book from all members' borrowedBooks
    await Member.updateMany({ borrowedBooks: bookId }, { $pull: { borrowedBooks: bookId } });

    const book = await Book.findByIdAndDelete(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get borrowers of a book (populated)
exports.getBookBorrowers = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId).populate("borrowers", "name email");
    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ borrowers: book.borrowers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
