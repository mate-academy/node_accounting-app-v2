'use strict';

const express = require('express');
const { router: expensesRouter } = require('./routes/expenses.router');
const { router: usersRouter } = require('./routes/users.router');
const userServices = require('./services/users.service');
const expenseServices = require('./services/expenses.service');

function createServer() {
  const server = express();

  userServices.removeAll();
  expenseServices.removeAll();

  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
