/* eslint-disable no-console */
'use strict';

const { userRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expenses.route');
const { resetUsers } = require('./services/user.service');
const { resetExpenses } = require('./services/expenses.service');
const express = require('express');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
