// routes/readerRoutes.js
const express = require('express');
const router = express.Router();
const { borrowBook, returnBook } = require('../controllers/readerController');

router.post('/borrow/:id', borrowBook);
router.post('/return/:id', returnBook);

module.exports = router;
