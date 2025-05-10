// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { addNewBook, updateBookDetails, deleteBook } = require('../controllers/adminController');

router.post('/books', addNewBook);
router.patch('/books/:id', updateBookDetails);
router.delete('/books/:id', deleteBook);

module.exports = router;
