'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.js');
const { expensesRouter } = require('./routes/expenses.js');
const expensesService = require('./services/expenses.js');
const usersService = require('./services/users.js');

function createServer() {
  const app = express();

  expensesService.reset();
  usersService.reset();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
