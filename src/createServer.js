'use strict';

const express = require('express');
const { userRouter } = require('./routes/users.js');
const { expenseRouter } = require('./routes/expenses.js');
const { userService } = require('./services/users.js');
const { expensesService } = require('./services/expenses.js');

function createServer() {
  const app = express();

  expensesService.resetExpenses();
  userService.resetUsers();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
