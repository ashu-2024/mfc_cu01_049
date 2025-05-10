const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db.json");

function readData() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data).tickets;
}

function writeData(tickets) {
  fs.writeFileSync(dbPath, JSON.stringify({ tickets }, null, 2));
}

module.exports = { readData, writeData };
