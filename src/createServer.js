'use strict';

const express = require('express');

const { usersRouter } = require('./routes/usersRouter');
const { expensesRouter } = require('./routes/expenseRouter');

const usersService = require('./services/usersService');
const expensesService = require('./services/expensesService');

function createServer() {
  usersService.init();
  expensesService.init();

  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
