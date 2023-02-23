'use strict';

const express = require('express');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const expensesService = require('./services/expenses');
const usersService = require('./services//users');

function createServer() {
  expensesService.reset();
  usersService.reset();

  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
