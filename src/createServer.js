'use strict';

const express = require('express');

const userService = require('./services/user.services');
const userRouter = require('./routes/user.route');

const expenseService = require('./services/expense.services');
const expenseRouter = require('./routes/expense.route');

function createServer() {
  userService.reset();
  expenseService.reset();

  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
