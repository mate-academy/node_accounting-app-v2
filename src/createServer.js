/* eslint-disable no-console */
'use strict';

const express = require('express');
const userService = require('./services/user.service');
const expenseService = require('./services/expenses.service');
const expensesRouter = require('./routes/expenses.route');
const usersRouter = require('./routes/users.route');

function createServer() {
  userService.clearUsers();
  expenseService.clearExpenses();

  const app = express();

  app.use(express.json());
  app.use('/expenses', expensesRouter.router);
  app.use('/users', usersRouter.router);

  return app;
}

module.exports = {
  createServer,
};
