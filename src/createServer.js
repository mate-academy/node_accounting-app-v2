'use strict';

const express = require('express');
const { userRouter } = require('./routers/user.router');
const { expensesRouter } = require('./routers/expense.router');
const { clear } = require('./services/user.service');
const { clearExpense } = require('./services/expenses.service');

function createServer() {
  const app = express();

  clear();
  clearExpense();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
