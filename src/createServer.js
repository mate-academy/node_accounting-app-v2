'use strict';

const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/users.router.js');
const expensesRouter = require('./routes/expenses.router.js');
const userService = require('./services/users.service.js');
const expenseService = require('./services/expenses.service.js');

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
