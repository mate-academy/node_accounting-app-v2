'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const { resetUsers } = require('./services/users.service');
const { resetExpenses } = require('./services/expenses.service');

function createServer() {
  const app = express();

  resetExpenses();
  resetUsers();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
