'use strict';

const cors = require('cors');
const express = require('express');
const userRouter = require('./routers/users.router');
const expensesRouter = require('./routers/expenses.router');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

function createServer() {
  const app = express();

  userService.resetUsers();
  expenseService.resetExpenses();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
