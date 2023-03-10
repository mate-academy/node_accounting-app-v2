'use strict';

const express = require('express');
const { userRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');

const userService = require('./services/users');
const expenseService = require('./services/expenses');

function createServer() {
  const app = express();

  userService.setInitial();
  expenseService.setInitial();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
