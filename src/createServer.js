'use strict';

const express = require('express');

const { router: usersRouter } = require('./users/usersRouter');
const { router: expensesRouter } = require('./expenses/expensesRouter');

const { resetExpenses } = require('./expenses/expensesServices');
const { resetUsers } = require('./users/usersServices');

function createServer() {
  const app = express();

  resetExpenses();
  resetUsers();

  app.use('/', express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
