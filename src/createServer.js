'use strict';

const express = require('express');

const { resetUsers } = require('./services/user.service');
const { userRouter } = require('./routes/user.route');
const { resetExpenses } = require('./services/expense.service');
const { expenseRouter } = require('./routes/expense.route');

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
