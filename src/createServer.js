'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');
const userService = require('./services/users.service');
const expenseService = require('./services/expenses.service');

function createServer() {
  userService.reset();
  expenseService.reset();

  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
