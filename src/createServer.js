'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route.js');
const expensesRouter = require('./routes/expenses.route.js');
const { reset: resetExpenses } = require('./services/expenses.service.js');
const { reset: resetUsers } = require('./services/users.service.js');

function createServer() {
  resetExpenses();
  resetUsers();

  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
