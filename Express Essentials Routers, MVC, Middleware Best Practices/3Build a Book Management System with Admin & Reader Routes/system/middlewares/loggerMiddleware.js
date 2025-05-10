// middlewares/loggerMiddleware.js
function loggerMiddleware(req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
  console.log(log);
  next();
}

module.exports = loggerMiddleware;
