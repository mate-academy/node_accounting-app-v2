'use strict';

const express = require('express');
const { expensesRouter } = require('./routes/expensesRouter');
const { usersRouter } = require('./routes/usersRouter');

const { clear: clearExpenses } = require('./services/expenses.services');
const { clear: clearUsers } = require('./services/users.services');

function createServer() {
  const app = express();

  clearExpenses();
  clearUsers();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = { createServer };
