'use strict';

const express = require('express');

const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const { clearUsers } = require('./services/users.service');
const { clearExpenses } = require('./services/expenses.services');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
