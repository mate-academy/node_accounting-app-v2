'use strict';

const express = require('express');

const userRouter = require('./routes/userRouter');
const expenseRouter = require('./routes/expenseRouter');
const userService = require('./services/user.service');
const expenseService = require('./services/expenses.service');

function createServer() {
  const app = express();

  userService.resetAllUsers();
  expenseService.resetAllExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
