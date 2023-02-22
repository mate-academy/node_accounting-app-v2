'use strict';

const express = require('express');
const userRouter = require('./routes/user').router;
const expensesRouter = require('./routes/expenses').router;
const { clearUsers } = require('./services/users');
const { clearExpenses } = require('./services/expenses');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
