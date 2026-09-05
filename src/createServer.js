'use strict';

const express = require('express');
const usersRouter = require('./routers/users.routers');
const expensesRouter = require('./routers/expenses.routers');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

function createServer() {
  usersService.clearDataBase();
  expensesService.clearDataBase();

  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
