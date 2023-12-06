'use strict';

const express = require('express');

const expenseService = require('./services/expense.service');
const userService = require('./services/user.service');

const expenseRouter = require('./routes/expense.route');
const userRouter = require('./routes/user.route');

function createServer() {
  const server = express();

  expenseService.clearExpenses();
  userService.clearUsers();

  server.use('/expenses', express.json(), expenseRouter);
  server.use('/users', express.json(), userRouter);

  return server;
}

module.exports = {
  createServer,
};
