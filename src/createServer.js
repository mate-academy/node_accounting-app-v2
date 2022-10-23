'use strict';

const express = require('express');
const userService = require('./services/users.js');
const expenseService = require('./services/expenses.js');
const { router: userRouter } = require('./routes/users.js');
const { router: expenseRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  userService.clear();
  expenseService.clear();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
