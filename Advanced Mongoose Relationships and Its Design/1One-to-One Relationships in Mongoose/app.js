const express = require("express");
const mongoose = require("mongoose");
const userProfileRoutes = require("./routes/userProfile.routes");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/OneToOneDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", userProfileRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
