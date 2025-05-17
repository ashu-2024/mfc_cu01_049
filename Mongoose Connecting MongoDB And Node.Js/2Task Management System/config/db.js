const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb://localhost:27017/TaskDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("error", console.error.bind(console, "connection error:"));
  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
  });
}
module.exports = connectDB;
