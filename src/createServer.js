'use strict';

const express = require('express');
const { resetUsers } = require('./services/userService');
const { resetExpenses } = require('./services/expensesService');
const { userRouter } = require('./routes/usersRoute');
const { expenseRouter } = require('./routes/expenseRoute');

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
