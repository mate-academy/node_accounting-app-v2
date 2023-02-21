'use strict';

const express = require('express');
const { userRouter } = require('./routes/users.js');
const { resetUsers } = require('./services/users');
const { resetExpenses } = require('./services/expenses');
const { expenseRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
