'use strict';

const express = require('express');

const userRouter = require('./user/user.router');
const expenseRouter = require('./expense/expense.router');

const userService = require('./user/user.service');
const expenseService = require('./expense/expense.service');

function createServer() {
  const app = express();

  userService.cleanUsers();
  expenseService.cleanExpenses();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
