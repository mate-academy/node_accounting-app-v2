'use strict';

const express = require('express');
const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');

const userService = require('./services/users');
const expenseService = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);
  userService.init();

  app.use('/expenses', expenseRouter);
  expenseService.init();

  return app;
}

module.exports = {
  createServer,
};
