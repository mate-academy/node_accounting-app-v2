'use strict';

const express = require('express');
const userRouter = require('./routes/user.route');
const expensesRouter = require('./routes/expenses.route');
const { clearExpenses } = require('./services/expenses.service');
const { clearUsers } = require('./services/user.service');

function createServer() {
  const app = express();

  clearExpenses();
  clearUsers();

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
