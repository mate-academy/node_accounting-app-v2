'use strict';

const express = require('express');

const userService = require('./services/users');
const expensesService = require('./services/expenses');

const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRouter.router);
  app.use('/expenses', express.json(), expenseRouter.router);

  expensesService.clearExpanses();
  userService.clearUsers();

  return app;
}

module.exports = {
  createServer,
};
