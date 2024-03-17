'use strict';

const express = require('express');
const userService = require('./services/user.service');
const expensesService = require('./services/expenses.service');
const userRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');
const app = express();

function createServer() {
  userService.clearUsers();
  expensesService.clearExpenses();

  app.use('/users', express.json(), userRouter.router);

  app.use('/expenses', express.json(), expensesRouter.router);

  return app;
}

module.exports = {
  createServer,
};
