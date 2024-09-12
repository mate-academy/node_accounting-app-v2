'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

const app = express();

function createServer() {
  usersService.reset();
  expensesService.reset();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
