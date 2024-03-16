'use strict';

const express = require('express');
const { userRouter } = require('./routes/user.route');
const { expenseRouter } = require('./routes/expense.route');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

function createServer() {
  const app = express();

  app.use(express.json());

  userService.restart();
  expenseService.restart();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
