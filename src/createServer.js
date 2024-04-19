'use strict';

const express = require('express');
const usersService = require('./services/user.service');
const expensesService = require('./services/expense.service');
const userRouter = require('./routes/users.route');
const expenseRouter = require('./routes/expenses.route');

function createServer() {
  const app = express();

  usersService.initUsers();
  expensesService.initExpenses();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
