'use strict';

const express = require('express');
const app = express();
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const { clearExpenses } = require('./services/expenses.service');
const { clearUsers } = require('./services/users.service');

function createServer() {
  clearExpenses();
  clearUsers();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
