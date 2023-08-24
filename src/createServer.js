'use strict';

const express = require('express');
const expensesRouter = require('./routers/expenses.js');
const usersRouter = require('./routers/users');
const { clearExpenses } = require('./services/expenses');
const { clearUsers } = require('./services/users');

function createServer() {
  const app = express();

  clearExpenses();
  clearUsers();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
