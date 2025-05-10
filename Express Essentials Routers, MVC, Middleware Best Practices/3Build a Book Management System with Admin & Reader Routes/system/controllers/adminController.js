// controllers/adminController.js
const { getBooks, addBook, updateBook, deleteBook, getBookById } = require('../models/bookModel');

async function addNewBook(req, res) {
  const { title, author, genre, publishedYear } = req.body;

  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: 'All fields (title, author, genre, publishedYear) are required' });
  }

  const books = await getBooks();
  const newBook = { id: books.length + 1, title, author, genre, publishedYear, status: 'available' };
  await addBook(newBook);

  res.status(201).json(newBook);
}

async function updateBookDetails(req, res) {
  const { id } = req.params;
  const { title, author, genre, publishedYear } = req.body;

  const book = await getBookById(Number(id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const updatedBook = { title, author, genre, publishedYear };
  await updateBook(Number(id), updatedBook);

  res.status(200).json(updatedBook);
}

async function deleteBook(req, res) {
  const { id } = req.params;

  const book = await getBookById(Number(id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  await deleteBook(Number(id));
  res.status(204).send();
}

module.exports = { addNewBook, updateBookDetails, deleteBook };
