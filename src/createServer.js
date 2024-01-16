'use strict';

const {
  clearAllUsers,
} = require('./services/users.service');

const {
  getUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteUser,
} = require('./controllers/users.controller');

const {
  clearAllExpenses,
} = require('./services/expenses.service');

const express = require('express');
const {
  getExpenses,
  getOneExpense,
  deleteExpense,
  createNewExpense,
  updateOneExpense,
} = require('./controllers/expenses.controller');

const server = express();

server.get('/users', getUsers);

server.get('/users/:id', getOneUser);

server.delete('/users/:id', deleteUser);

server.post('/users', express.json(), createNewUser);

server.patch('/users/:id', express.json(), updateOneUser);

server.get('/expenses', getExpenses);

server.get('/expenses/:id', getOneExpense);

server.delete('/expenses/:id', deleteExpense);

server.post('/expenses', express.json(), createNewExpense);

server.patch('/expenses/:id', express.json(), updateOneExpense);

function createServer() {
  clearAllExpenses();
  clearAllUsers();

  server.use('/', (req, res) => {
    res.send('Hello Express!');
  });

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  return server;
}

module.exports = {
  createServer,
};
