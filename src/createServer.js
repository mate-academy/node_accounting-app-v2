'use strict';

const express = require('express');

const { userRouter } = require('./routes/user.router');
const { expenseRouter } = require('./routes/expense.router');

const { userService } = require('./api/user.service');
const { expenseService } = require('./api/expense.service');

function createServer() {
  const app = express();

  app.use(express.json());

  userService.clearUsers();
  expenseService.clearExpenses();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
