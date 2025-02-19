'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expenses.route');
const { init: usersInit } = require('./services/user.service');
const { init: expensesInit } = require('./services/expense.service');

function createServer() {
  usersInit();
  expensesInit();

  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
