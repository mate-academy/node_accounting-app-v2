'use strict';

const express = require('express');
const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');
const { reset: resetUsers } = require('./services/users.js');
const { reset: resetExpenses } = require('./services/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  resetExpenses();
  resetUsers();

  return app;
}

module.exports = {
  createServer,
};
