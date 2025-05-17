const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Profile = require("../models/profile.model");

// Add User
router.post("/add-user", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const user = new User({ name, email });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email must be unique" });
    }
    res.status(500).json({ error: err.message });
  }
});

// Add Profile
router.post("/add-profile", async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

    if (!user) {
      return res.status(400).json({ error: "User reference is required" });
    }

    // Check if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if profile already exists for this user (unique)
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res.status(409).json({ error: "Profile for this user already exists" });
    }

    const profile = new Profile({ bio, socialMediaLinks, user });
    await profile.save();

    res.status(201).json({ message: "Profile created", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all profiles with user populated
router.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
