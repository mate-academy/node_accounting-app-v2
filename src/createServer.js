'use strict';

const express = require('express');
const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');
const expenseService = require('./services/expenses');
const userService = require('./services/users');

function createServer() {
  const app = express();

  expenseService.removeAll();
  userService.removeAll();

  app.use('/users', userRouter);

  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
