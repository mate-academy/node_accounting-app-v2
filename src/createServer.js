'use strict';

const express = require('express');
const { usersRouter } = require('./routers/users.router');
const { expensesRouter } = require('./routers/expenses.router');
const { usersService } = require('./services/users.service');
const { expensesService } = require('./services/expenses.service');

function createServer() {
  const app = express();

  usersService.clearUsers();
  expensesService.clearExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
