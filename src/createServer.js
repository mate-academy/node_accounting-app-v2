'use strict';

const express = require('express');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const userService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  userService.init();
  expensesService.init();

  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
