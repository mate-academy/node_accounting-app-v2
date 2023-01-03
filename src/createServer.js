'use strict';

const express = require('express');

const { router: expensesRouter } = require('./routes/expenses');
const { router: usersRouter } = require('./routes/users');

const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  const app = express();

  usersService.resetUsers();
  expensesService.resetExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
