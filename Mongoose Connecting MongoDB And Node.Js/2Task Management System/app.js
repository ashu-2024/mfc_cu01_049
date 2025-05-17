const express = require("express");
const app = express();
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");

connectDB();

app.use(express.json());
app.use("/", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
