'use strict';

const express = require('express');
const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');
const { clearUsers } = require('./services/user.service');
const { clearExpenses } = require('./services/expense.service');

function createServer() {
  // to ensure each test starts with no data present
  clearUsers();
  clearExpenses();

  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
