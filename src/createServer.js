'use strict';

const express = require('express');

const userRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  const app = express();

  usersService.getInit();
  expensesService.getInit();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
