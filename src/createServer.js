'use strict';

const express = require('express');
const userService = require('./services/usersService.js');
const expenseService = require('./services/expensesService.js');
const { router: userRouter } = require('./routes/users.js');
const { router: expenseRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  userService.clear();
  expenseService.clear();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
