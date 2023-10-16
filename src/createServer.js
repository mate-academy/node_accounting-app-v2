'use strict';

const express = require('express');
const userService = require('./services/users.services');
const expensesService = require('./services/expenses.services');
const userRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');

function createServer() {
  const app = express();

  userService.clear();
  expensesService.clear();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
