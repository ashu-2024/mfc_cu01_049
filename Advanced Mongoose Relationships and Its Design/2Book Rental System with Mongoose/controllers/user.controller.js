const User = require("../models/user.model");
const Book = require("../models/book.model");

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and Email required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: "Email already exists" });

    const user = new User({ name, email });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserRentals = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("rentedBooks");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ rentedBooks: user.rentedBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rentBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) return res.status(400).json({ error: "userId and bookId are required" });

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!book) return res.status(404).json({ error: "Book not found" });

    // Avoid duplicate rental
    if (user.rentedBooks.includes(bookId)) {
      return res.status(409).json({ error: "User already rented this book" });
    }

    user.rentedBooks.push(bookId);
    book.rentedBy.push(userId);

    await user.save();
    await book.save();

    res.status(200).json({ message: "Book rented successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) return res.status(400).json({ error: "userId and bookId are required" });

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!book) return res.status(404).json({ error: "Book not found" });

    user.rentedBooks = user.rentedBooks.filter((id) => id.toString() !== bookId);
    book.rentedBy = book.rentedBy.filter((id) => id.toString() !== userId);

    await user.save();
    await book.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
