'use strict';

const express = require('express');
const { clearUsers } = require('./services/user.servise');
const { clearExpenses } = require('./services/expenses.service');
const userRouter = require('./routes/user.route');
const expensesRouter = require('./routes/expenses.route');

function createServer() {
  clearExpenses();
  clearUsers();

  const app = express();

  app.use('/', userRouter);
  app.use('/', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
