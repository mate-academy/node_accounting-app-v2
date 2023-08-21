'use strict';

const express = require('express');

const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  usersService.clean();
  expensesService.clean();

  app.use(express.json());

  app.use(userRouter);
  app.use(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
