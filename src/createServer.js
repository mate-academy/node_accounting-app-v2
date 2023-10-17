'use strict';

const express = require('express');
const { clearUsers } = require('./services/users.service');
const { clearExpenses } = require('./services/expenses.service');
const usersRouter = require('./routers/users.router');
const expensesRouter = require('./routers/expense.router');

function createServer() {
  const app = express();

  clearExpenses();
  clearUsers();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
