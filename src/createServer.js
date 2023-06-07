'use strict';

const express = require('express');

const userService = require('./services/users');
const expensesService = require('./services/expenses');

const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', userRouter.router);
  app.use('/expenses', expenseRouter.router);

  expensesService.clearExpenses();
  userService.clearUsers();

  return app;
}

module.exports = {
  createServer,
};
