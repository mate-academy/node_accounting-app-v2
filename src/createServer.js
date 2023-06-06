'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/users');
const userService = require('./services/users');
const expensesService = require('./services/expenses');
const { expenseRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  userService.resetUsers();
  expensesService.resetExpenses();

  return app;
}

module.exports = {
  createServer,
};
