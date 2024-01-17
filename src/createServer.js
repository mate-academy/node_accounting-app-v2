'use strict';

const express = require('express');
const cors = require('cors');
const { Router } = require('./routes/user.routes');
const { expenseRouter } = require('./routes/expenses.routes');
const userService = require('./services/user.service');
const expensesService = require('./services/expenses.service');

const userRouter = Router;

function createServer() {
  userService.resetUsers();
  expensesService.resetExpenses();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
