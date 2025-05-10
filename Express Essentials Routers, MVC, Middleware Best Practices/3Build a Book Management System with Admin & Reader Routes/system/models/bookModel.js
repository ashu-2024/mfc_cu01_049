// models/bookModel.js
const fs = require('fs-extra');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

// Utility function to read the db.json
async function getBooks() {
  const data = await fs.readJson(dbPath);
  return data.books;
}

// Write books back to the db
async function writeBooks(books) {
  await fs.writeJson(dbPath, { books });
}

// Get a single book by ID
async function getBookById(id) {
  const books = await getBooks();
  return books.find(book => book.id === id);
}

// Add a new book
async function addBook(book) {
  const books = await getBooks();
  books.push(book);
  await writeBooks(books);
}

// Update a book
async function updateBook(id, updatedBook) {
  const books = await getBooks();
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    await writeBooks(books);
  }
}

// Delete a book
async function deleteBook(id) {
  const books = await getBooks();
  const updatedBooks = books.filter(book => book.id !== id);
  await writeBooks(updatedBooks);
}

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
