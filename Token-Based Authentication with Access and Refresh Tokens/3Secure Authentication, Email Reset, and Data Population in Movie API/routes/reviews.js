// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { verifyAccessToken } = require('../middleware/auth'); // your JWT auth middleware

// Add a review (protected route)
router.post('/', verifyAccessToken, async (req, res) => {
  const { movieId, rating, comment } = req.body;
  const userId = req.user.id; // set in auth middleware after token verification

  if (!movieId || !rating) {
    return res.status(400).json({ message: 'Movie ID and rating are required' });
  }

  try {
    const newReview = new Review({
      userId,
      movieId,
      rating,
      comment,
    });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
