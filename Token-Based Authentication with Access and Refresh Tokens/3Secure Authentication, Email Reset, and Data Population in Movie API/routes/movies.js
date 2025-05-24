// routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Review = require('../models/Review');

// Get all movies with reviews populated using $lookup
router.get('/', async (req, res) => {
  try {
    const moviesWithReviews = await Movie.aggregate([
      {
        $lookup: {
          from: 'reviews',        // collection to join
          localField: '_id',      // field in Movie
          foreignField: 'movieId',// field in Review
          as: 'reviews',          // output array field
        }
      }
    ]);
    res.json(moviesWithReviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get movie by id with populated reviews
router.get('/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const movieWithReviews = await Movie.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(movieId) } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'movieId',
          as: 'reviews',
        }
      }
    ]);
    if (!movieWithReviews.length) return res.status(404).json({ message: 'Movie not found' });
    res.json(movieWithReviews[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
