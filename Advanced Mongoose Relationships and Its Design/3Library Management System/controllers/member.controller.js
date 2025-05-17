const Member = require("../models/member.model");
const Book = require("../models/book.model");

// Add a member
exports.addMember = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

    const exists = await Member.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already exists" });

    const member = new Member({ name, email });
    await member.save();

    res.status(201).json({ message: "Member added", member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrow book
exports.borrowBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;
    if (!memberId || !bookId) return res.status(400).json({ error: "memberId and bookId are required" });

    const member = await Member.findById(memberId);
    const book = await Book.findById(bookId);
    if (!member) return res.status(404).json({ error: "Member not found" });
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.status === "borrowed") {
      return res.status(409).json({ error: "Book is already borrowed" });
    }

    book.status = "borrowed";
    book.borrowers.push(member._id);
    member.borrowedBooks.push(book._id);

    await book.save();
    await member.save();

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Return book
exports.returnBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;
    if (!memberId || !bookId) return res.status(400).json({ error: "memberId and bookId are required" });

    const member = await Member.findById(memberId);
    const book = await Book.findById(bookId);
    if (!member) return res.status(404).json({ error: "Member not found" });
    if (!book) return res.status(404).json({ error: "Book not found" });

    // Remove member from book borrowers
    book.borrowers = book.borrowers.filter((id) => id.toString() !== memberId);
    // Remove book from member borrowedBooks
    member.borrowedBooks = member.borrowedBooks.filter((id) => id.toString() !== bookId);

    // If no borrowers remain, update status to available
    if (book.borrowers.length === 0) {
      book.status = "available";
    }

    await book.save();
    await member.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get member's borrowed books (populated)
exports.getMemberBorrowedBooks = async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const member = await Member.findById(memberId).populate("borrowedBooks", "title author status");
    if (!member) return res.status(404).json({ error: "Member not found" });

    res.status(200).json({ borrowedBooks: member.borrowedBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
