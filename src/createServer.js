'use strict';

const express = require('express');

const usersRouter = require('./routes/usersRoute');
const expensesRouter = require('./routes/expensesRoute');

// const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  const app = express();

  // usersService.runUsers();
  expensesService.runExpenses();
  // usersService.runExpenses();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
