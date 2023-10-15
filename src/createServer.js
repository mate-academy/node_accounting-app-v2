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

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
