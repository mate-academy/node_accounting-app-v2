'use strict';

const express = require('express');
const { usersRouter } = require('./Users/users.router');
const { expensesRouter } = require('./Expenses/expenses.router');
const { clearUsers } = require('./Users/users.service');
const { clearExpenses } = require('./Expenses/expenses.service');

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
