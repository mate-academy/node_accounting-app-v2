'use strict';

const express = require('express');
const { reset: resetUsers } = require('./services/users');
const { reset: resetExpanses } = require('./services/expenses');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const createServer = () => {
  const app = express();

  resetUsers();
  resetExpanses();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
