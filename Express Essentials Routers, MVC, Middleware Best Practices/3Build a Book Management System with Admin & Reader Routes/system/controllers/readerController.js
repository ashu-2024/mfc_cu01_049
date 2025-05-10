// controllers/readerController.js
const { getBooks, updateBook, getBookById } = require('../models/bookModel');
const moment = require('moment');

async function borrowBook(req, res) {
  const { id } = req.params;
  const { readerName } = req.body;

  if (!readerName) {
    return res.status(400).json({ error: 'Reader name is required' });
  }

  const book = await getBookById(Number(id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (book.status === 'borrowed') {
    return res.status(400).json({ error: 'Book is already borrowed' });
  }

  book.status = 'borrowed';
  book.borrowedBy = readerName;
  book.borrowedDate = moment().format();

  await updateBook(Number(id), book);

  res.status(200).json(book);
}

async function returnBook(req, res) {
  const { id } = req.params;

  const book = await getBookById(Number(id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const borrowedDate = moment(book.borrowedDate);
  const daysBorrowed = moment().diff(borrowedDate, 'days');
  if (daysBorrowed < 3) {
    return res.status(400).json({ error: 'Book cannot be returned within 3 days of borrowing.' });
  }

  book.status = 'available';
  book.borrowedBy = null;
  book.borrowedDate = null;

  await updateBook(Number(id), book);

  res.status(200).json(book);
}

module.exports = { borrowBook, returnBook };
