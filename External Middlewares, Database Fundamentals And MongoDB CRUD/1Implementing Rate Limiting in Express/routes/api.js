// routes/api.js
const express = require("express");

const publicRoute = express.Router();
const limitedRoute = express.Router();

publicRoute.get("/", (req, res) => {
  res.json({ message: "This is a public endpoint!" });
});

limitedRoute.get("/", (req, res) => {
  res.json({ message: "You have access to this limited endpoint!" });
});

module.exports = {
  publicRoute,
  limitedRoute,
};
