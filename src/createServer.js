'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.routes');
const { expensesRouter } = require('./routes/expenses.routes');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

function createServer() {
  const app = express();

  usersService.clear();
  expensesService.clear();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
