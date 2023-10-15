'use strict';

const express = require('express');

const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');
const { router: usersRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expenses.route');

function createServer() {
  const app = express();

  usersService.clear();
  expensesService.clear();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
