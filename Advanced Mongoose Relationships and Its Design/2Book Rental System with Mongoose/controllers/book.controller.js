const Book = require("../models/book.model");
const User = require("../models/user.model");

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    if (!title || !author) return res.status(400).json({ error: "Title and Author are required" });

    const book = new Book({ title, author, genre });
    await book.save();

    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookRenters = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId).populate("rentedBy", "name email");
    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ renters: book.rentedBy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // Remove book references from all users
    await User.updateMany(
      { rentedBooks: bookId },
      { $pull: { rentedBooks: bookId } }
    );

    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
