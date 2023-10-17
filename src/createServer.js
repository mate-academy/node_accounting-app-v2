'use strict';

const express = require('express');
const { usersRouter } = require('./routesTest/users.routes');
const { expensesRouter } = require('./routesTest/expenses.routes');
const { clear: clearExpenses } = require('./services/expenses.services');
const { clear: clearUsers } = require('./services/users.services');

function createServer() {
  const app = express();

  clearExpenses();
  clearUsers();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
