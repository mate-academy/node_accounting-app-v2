'use strict';

const express = require('express');
const usersRouter = require('./routes/users');
const usersService = require('./services/users');
const expensesService = require('./services/expenses');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  usersService.setInitialUsers();
  expensesService.setInitialExpensees();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
