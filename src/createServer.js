'use strict';

const express = require('express');
const { userRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');
const { resetExpenses } = require('./services/expenses');
const { resetUsers } = require('./services/users');

function createServer() {
  const app = express();

  resetExpenses();
  resetUsers();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
