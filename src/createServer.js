'use strict';

const express = require('express');

const { router: usersRouter } = require('./routes/users');
const { router: expenseRouter } = require('./routes/expenses');
const { clear: clearUsers } = require('./services/users');
const { clear: clearExpenses } = require('./services/expenses');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use('/users', usersRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
