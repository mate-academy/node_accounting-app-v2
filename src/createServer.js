'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { usersService } = require('./services/users.service');
const { expensesRouter } = require('./routes/expenses.route');
const { expensesService } = require('./services/expenses.service');

function createServer() {
  const app = express();

  usersService.resetAll();
  expensesService.resetAll();
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = { createServer };
