'use strict';

const express = require('express');

const usersRouter = require('./Routes/usersRoute');
const expensesRouter = require('./Routes/expensesRoute');

const expensesService = require('./services/expenses');
const usersService = require('./services/users');

function createServer() {
  const app = express();

  usersService.runUsers();
  expensesService.runExpenses();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
