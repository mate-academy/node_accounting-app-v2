'use strict';

const {
  clearAllUsers,
} = require('./services/users.service');

const {
  clearAllExpenses,
} = require('./services/expenses.service');

const express = require('express');

const { userRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');

const server = express();

function createServer() {
  clearAllExpenses();
  clearAllUsers();

  server.use('/users', express.json(), userRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
