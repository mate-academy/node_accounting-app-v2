'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/users.routes');
const { router: expenseRouter } = require('./routes/expense.routes');
const usersService = require('./services/users.service');
const expenseService = require('./services/expense.service');

function createServer() {
  const app = express();

  usersService.clearUsers();
  expenseService.clearExpenses();
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
