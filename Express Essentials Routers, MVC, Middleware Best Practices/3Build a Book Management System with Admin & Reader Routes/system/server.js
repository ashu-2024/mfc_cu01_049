// server.js
const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const readerRoutes = require('./routes/readerRoutes');

// Middleware for logging
const loggerMiddleware = require('./middlewares/loggerMiddleware');

// Use logger middleware
app.use(loggerMiddleware);

// Use routes
app.use('/admin', adminRoutes);
app.use('/reader', readerRoutes);

// Undefined route handling
app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
