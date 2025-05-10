const express = require("express");
const app = express();
const ticketRoutes = require("./routes/ticketRoutes");

app.use(express.json());
app.use("/tickets", ticketRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
