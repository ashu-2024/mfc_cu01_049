const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/vehicleTripDB');
  console.log('MongoDB Connected');
};

module.exports = connectDB;
