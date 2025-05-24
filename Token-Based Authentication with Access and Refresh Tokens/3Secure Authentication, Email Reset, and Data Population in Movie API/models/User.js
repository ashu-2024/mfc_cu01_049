// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
module.exports = mongoose.model('User', userSchema);

// models/Movie.js
const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  director: String,
  releaseDate: Date,
});
module.exports = mongoose.model('Movie', movieSchema);

// models/Review.js
const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Review', reviewSchema);
