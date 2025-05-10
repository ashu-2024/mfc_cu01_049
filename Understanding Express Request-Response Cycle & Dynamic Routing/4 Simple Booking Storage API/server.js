const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const readDB = () => JSON.parse(fs.readFileSync("db.json", "utf8"));
const writeDB = (data) => fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

// Create book
app.post("/books", (req, res) => {
  const books = readDB();
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  writeDB(books);
  res.status(201).json(newBook);
});

// Get all books
app.get("/books", (req, res) => {
  const books = readDB();
  res.status(200).json(books);
});

// Get book by ID
app.get("/books/:id", (req, res) => {
  const books = readDB();
  const book = books.find(b => b.id == req.params.id);
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

// Update book by ID
app.put("/books/:id", (req, res) => {
  let books = readDB();
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books[index] = { ...books[index], ...req.body };
  writeDB(books);
  res.json(books[index]);
});

// Delete book by ID
app.delete("/books/:id", (req, res) => {
  let books = readDB();
  const filtered = books.filter(b => b.id != req.params.id);
  if (filtered.length === books.length) return res.status(404).json({ message: "Book not found" });

  writeDB(filtered);
  res.json({ message: "Book deleted successfully" });
});

// Search by author or title
app.get("/books/search", (req, res) => {
  const { author, title } = req.query;
  const books = readDB();

  if (!author && !title) {
    return res.status(400).json({ message: "Provide author or title in query" });
  }

  const matches = books.filter(book => {
    const byAuthor = author && book.author.toLowerCase().includes(author.toLowerCase());
    const byTitle = title && book.title.toLowerCase().includes(title.toLowerCase());
    return byAuthor || byTitle;
  });

  matches.length ? res.json(matches) : res.json({ message: "No books found" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
