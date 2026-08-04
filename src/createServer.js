'use strict';

const usersRouter = require('./routes/user.router');
const expensesRouter = require('./routes/expense.router');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

const express = require('express');

function createServer() {
  userService.users.length = 0;
  expenseService.expenses.length = 0;

  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
