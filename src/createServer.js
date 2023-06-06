/* eslint-disable no-console */
'use strict';

const express = require('express');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  usersService.reset();
  expensesService.reset();

  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
