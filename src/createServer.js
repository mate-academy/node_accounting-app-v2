'use strict';

const express = require('express');
const { clearUsers } = require('./services/user.service');
const { clearExpenses } = require('./services/expense.service');
const { userRouter } = require('./routes/user.route');
const { expenseRouter } = require('./routes/expense.route');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use('/users', userRouter);

  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
