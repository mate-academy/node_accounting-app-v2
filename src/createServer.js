'use strict';

const express = require('express');
const { userRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');
// const userController = require('./controllers/users');
// const expenseController = require('./controllers/expenses');

const userService = require('./services/users');
const expenseService = require('./services/expenses');

function createServer() {
  const app = express();

  userService.emptyUsers();
  expenseService.emptyExpenses();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
