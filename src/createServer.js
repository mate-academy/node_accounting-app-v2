'use strict';

const express = require('express');

const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

const { userRouter } = require('./routers/users');
const { expenseRouter } = require('./routers/expenses');

function createServer() {
  const app = express();

  userService.setInitialValue();
  expenseService.setInitialValue();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
