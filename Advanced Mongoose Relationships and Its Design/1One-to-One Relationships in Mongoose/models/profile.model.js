const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  bio: { type: String },
  socialMediaLinks: [{ type: String }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
    unique: true, // Ensures one-to-one relationship
  },
});

module.exports = mongoose.model("Profile", profileSchema);
