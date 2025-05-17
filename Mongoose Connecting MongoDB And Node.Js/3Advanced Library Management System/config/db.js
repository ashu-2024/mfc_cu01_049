const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb://localhost:27017/LibraryDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("error", (err) => console.error("DB connection error:", err));
  mongoose.connection.once("open", () => console.log("Connected to MongoDB"));
}

module.exports = connectDB;
