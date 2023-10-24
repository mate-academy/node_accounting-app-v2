'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const usersServices = require('./services/users.services');
const expenseServices = require('./services/expenses.services');

function createServer() {
  const server = express();

  expenseServices.resetExpenses();
  usersServices.resetUsers();

  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
