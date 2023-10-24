'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const expenseService = require('./services/expenses.service');
const usersService = require('./services/users.service');

function createServer() {
  const app = express();

  expenseService.resetExpenses();
  usersService.resetUsers();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
