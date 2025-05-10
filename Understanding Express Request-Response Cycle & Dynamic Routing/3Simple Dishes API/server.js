const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const readDB = () => JSON.parse(fs.readFileSync("db.json", "utf8"));
const writeDB = (data) => fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

// Add a new dish
app.post("/dishes", (req, res) => {
  const dishes = readDB();
  const newDish = { id: Date.now(), ...req.body };
  dishes.push(newDish);
  writeDB(dishes);
  res.status(201).json(newDish);
});

// Get all dishes
app.get("/dishes", (req, res) => {
  const dishes = readDB();
  res.status(200).json(dishes);
});

// Get dish by ID
app.get("/dishes/:id", (req, res) => {
  const dishes = readDB();
  const dish = dishes.find(d => d.id == req.params.id);
  dish ? res.json(dish) : res.status(404).json({ message: "Dish not found" });
});

// Update dish by ID
app.put("/dishes/:id", (req, res) => {
  let dishes = readDB();
  const index = dishes.findIndex(d => d.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Dish not found" });

  dishes[index] = { ...dishes[index], ...req.body };
  writeDB(dishes);
  res.json(dishes[index]);
});

// Delete dish by ID
app.delete("/dishes/:id", (req, res) => {
  let dishes = readDB();
  const filtered = dishes.filter(d => d.id != req.params.id);
  if (filtered.length === dishes.length) return res.status(404).json({ message: "Dish not found" });

  writeDB(filtered);
  res.json({ message: "Dish deleted successfully" });
});

// Search by name (partial match supported)
app.get("/dishes/get", (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Name query required" });

  const dishes = readDB();
  const result = dishes.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
  result.length ? res.json(result) : res.json({ message: "No dishes found" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
