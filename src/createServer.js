'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use(cors());

  usersService.clear();
  expensesService.clear();

  app.use('/users', userRouter.router);
  app.use('/expenses', expenseRouter.router);

  return app;
}

module.exports = {
  createServer,
};
