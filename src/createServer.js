'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expense.route');

const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

const createServer = () => {
  const app = express();

  userService.clearUsers();
  expenseService.clearExpenses();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
