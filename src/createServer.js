'use strict';

const express = require('express');
const userRouter = require('./routes/user.route');
const expensesRouter = require('./routes/expenses.route');
const userService = require('./services/user.service.js');
const expenceService = require('./services/expenses.service.js');

function createServer() {
  const app = express();

  app.use(express.json());

  userService.resetUsers();
  expenceService.resetExpenses();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
