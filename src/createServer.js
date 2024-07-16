'use strict';

const express = require('express');
const userService = require('./services/users.service');
const expenseService = require('./services/expenses.service');
const userRouter = require('./routes/users.route');
const expenseRouter = require('./routes/expenses.route');

function createServer() {
  const app = express();

  app.use(express.json());

  userService.reset();
  expenseService.reset();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
