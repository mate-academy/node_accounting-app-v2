'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { expenseRouter } = require('./routes/expense.route');
const userService = require('./services/user.service');
const expenseSrvice = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use(cors());
  userService.start();
  expenseSrvice.start();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
