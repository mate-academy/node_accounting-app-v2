'use strict';

const express = require('express');

const { router: userRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');
const { clear: clearUsers } = require('./services/user.service');
const { clear: clearExpenses } = require('./services/expense.service');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
