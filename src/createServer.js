'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users.routes');
const { router: expensesRouter } = require('./routes/expenses.routes');
const expensesServices = require('./services/expenses.services');
const usersServices = require('./services/users.services');

function createServer() {
  const app = express();

  usersServices.clearUsers();
  expensesServices.clearExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = { createServer };
