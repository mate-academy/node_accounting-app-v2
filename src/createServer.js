'use strict';

const express = require('express');
const userRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const { clearUsers } = require('../src/services/users.services');
const { clearExpenses } = require('../src/services/expenses.sevices');
const app = express();

function createServer() {
  clearUsers();
  clearExpenses();
  app.use('/expenses', expensesRouter);

  app.use('/users', userRouter);

  return app;
}

module.exports = {
  createServer,
};
