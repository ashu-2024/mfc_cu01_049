// middlewares/returnCheckMiddleware.js
const moment = require('moment');

function returnCheckMiddleware(req, res, next) {
  // Implement logic to check if the book is returned within 3 days
  next();
}

module.exports = returnCheckMiddleware;
