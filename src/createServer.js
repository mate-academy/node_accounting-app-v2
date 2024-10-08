'use strict';

const express = require('express');

const { usersRouter } = require('./routes/usersRouter');
const userService = require('./services/usersService');

const expenseService = require('./services/expensesService');
const { expensesRouter } = require('./routes/expensesRouter');

function createServer() {
  userService.init();
  expenseService.init();

  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
