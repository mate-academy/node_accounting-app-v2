'use strict';

const express = require('express');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const usersService = require('./services/users');
const expensesService = require('./services/expenses');

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
