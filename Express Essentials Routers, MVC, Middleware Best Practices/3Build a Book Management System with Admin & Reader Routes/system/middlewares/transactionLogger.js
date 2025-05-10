// middlewares/transactionLogger.js
const fs = require('fs');
const path = require('path');

function transactionLogger(req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.body.readerName} borrowed "${req.body.title}"`;
  fs.appendFileSync(path.join(__dirname, '../transactions.log'), log + '\n');
  next();
}

module.exports = transactionLogger;
