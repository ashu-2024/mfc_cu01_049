const mongoose = require("mongoose");
const validator = require("validator");

const profileSchema = new mongoose.Schema({
  profileName: {
    type: String,
    enum: ["fb", "twitter", "github", "instagram"],
    required: true
  },
  url: {
    type: String,
    required: true,
    validate: [validator.isURL, "Invalid URL format"]
  }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"]
  },
  profiles: [profileSchema]
});

module.exports = mongoose.model("User", userSchema);
