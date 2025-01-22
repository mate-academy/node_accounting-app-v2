'use strict';

const express = require('express');
const userRouter = require('./routes/user.route.js');
const userService = require('./services/user.service.js');
const expenseRouter = require('./routes/expense.route.js');
const expenseService = require('./services/expense.service.js');

function createServer() {
  const app = express();

  userService.resetUsers();
  expenseService.resetExpenses();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
