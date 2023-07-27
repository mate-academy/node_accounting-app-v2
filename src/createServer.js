'use strict';

const express = require('express');
const { usersService } = require('./services/users.service.js');
const { usersRouter } = require('./routes/users.route');
const { expensesService } = require('./services/expenses.servise.js');
const { expensesRouter } = require('./routes/expenses.route');

function createServer() {
  const app = express();

  usersService.setInitialUsers();

  app.use('/users', usersRouter);

  expensesService.setInitialExpenses();

  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
