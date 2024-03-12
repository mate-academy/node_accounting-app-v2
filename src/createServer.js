'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

function createServer() {
  const app = express();

  usersService.clearUsers();
  expensesService.clearExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = { createServer };
