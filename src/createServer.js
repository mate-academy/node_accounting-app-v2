'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');

const { clearUsers } = require('./services/users.service');
const { clearExpenses } = require('./services/expenses.service');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
