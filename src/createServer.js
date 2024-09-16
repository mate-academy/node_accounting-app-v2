'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');
const expenseService = require('./services/expenses');
const userService = require('./services/users');

function createServer() {
  const app = express();

  userService.removeAllUsers();
  expenseService.removeAllExpenses();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
