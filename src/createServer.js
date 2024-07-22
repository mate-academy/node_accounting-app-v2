'use strict';

const express = require('express');
const { resetUsers } = require('./services/user.service');
const { resetExpenses } = require('./services/expenses.sevice');
const { expensesRouter } = require('./router/expense.router');
const { usersRouter } = require('./router/user.router');

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
