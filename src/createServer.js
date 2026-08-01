'use strict';

const express = require('express');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');

function createServer() {
  usersService.reset();
  expensesService.reset();

  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
