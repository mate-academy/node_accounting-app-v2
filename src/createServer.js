'use strict';

const express = require('express');
const { resetUsers } = require('./services/user.service');
const { resetExpenses } = require('./services/expenses.service');
const { usersRouter } = require('./routes/users.router');
const { expensesRouter } = require('./routes/expenses.router');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
