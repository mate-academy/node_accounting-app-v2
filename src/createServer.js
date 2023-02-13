'use strict';

const express = require('express');
const { expensesRouter } = require('./expenses/router');
const { usersRouter } = require('./users/router');
const { resetExpenses } = require('./expenses/services');
const { resetUsers } = require('./users/services');

function createServer() {
  const app = express();

  resetExpenses();
  resetUsers();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
