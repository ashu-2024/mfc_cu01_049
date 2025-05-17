const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  status: {
    type: String,
    enum: ["available", "borrowed"],
    default: "available",
    required: true,
  },
  borrowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre hook for borrowing validation
bookSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status === "borrowed" && this.borrowers.length === 0) {
    return next(new Error("Borrowers list can't be empty if book is borrowed"));
  }
  next();
});

module.exports = mongoose.model("Book", bookSchema);
