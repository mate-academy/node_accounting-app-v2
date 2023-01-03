'use strict';

const express = require('express');
const userService = require('./services/users');
const expenseService = require('./services/expenses');
const userRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  userService.reset();
  expenseService.reset();

  app.use('/users', userRouter);

  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
