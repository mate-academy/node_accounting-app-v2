'use strict';

const express = require('express');
const expensesRouter = require('./routers/expenses');
const usersRouter = require('./routers/users');
const expensesServise = require('./services/expenses');
const usersServise = require('./services/users');

function createServer() {
  const app = express();

  expensesServise.clear();
  usersServise.clear();

  app.use(express.json());
  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
