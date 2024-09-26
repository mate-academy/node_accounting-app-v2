'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const usersServices = require('./services/users.service');
const expensesServices = require('./services/expenses.service');

function createServer() {
  const app = express();

  usersServices.clearUsers();
  expensesServices.clearExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
