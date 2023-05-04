'use strict';

const express = require('express');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  const app = express();

  usersService.init();
  expensesService.init();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
