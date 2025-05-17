const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");

const app = express();

connectDB();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
