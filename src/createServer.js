'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/users');
const { router: expenseRouter } = require('./routes/expenses');
const userService = require('./services/users');
const expenseService = require('./services/expenses');

function createServer() {
  const app = express();

  userService.resetState();
  expenseService.resetState();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
