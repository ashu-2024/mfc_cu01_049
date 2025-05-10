const { readData, writeData } = require("../models/ticketModel");

function getAll(req, res) {
  const tickets = readData();
  res.status(200).json(tickets);
}

function getById(req, res) {
  const id = parseInt(req.params.id);
  const tickets = readData();
  const ticket = tickets.find(t => t.id === id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json(ticket);
}

function create(req, res) {
  const tickets = readData();
  const newTicket = {
    id: tickets.length + 1,
    ...req.body,
    status: "pending"
  };
  tickets.push(newTicket);
  writeData(tickets);
  res.status(201).json(newTicket);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const tickets = readData();
  const idx = tickets.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Ticket not found" });
  tickets[idx] = { ...tickets[idx], ...req.body };
  writeData(tickets);
  res.json(tickets[idx]);
}

function remove(req, res) {
  const id = parseInt(req.params.id);
  let tickets = readData();
  const found = tickets.some(t => t.id === id);
  if (!found) return res.status(404).json({ error: "Ticket not found" });
  tickets = tickets.filter(t => t.id !== id);
  writeData(tickets);
  res.json({ message: "Ticket deleted successfully" });
}

function resolve(req, res) {
  const id = parseInt(req.params.id);
  const tickets = readData();
  const ticket = tickets.find(t => t.id === id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  ticket.status = "resolved";
  writeData(tickets);
  res.json(ticket);
}

module.exports = { getAll, getById, create, update, remove, resolve };
