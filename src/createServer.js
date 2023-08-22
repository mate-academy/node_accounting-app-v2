'use strict';

const express = require('express');

const { router: usersRouter } = require('./routes/users');
const { clearUser: clearU } = require('./services/users');
const { router: expensesRouter } = require('./routes/expenses');
const { removeAllExpenses: clearE } = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(express.json());
  clearU();
  clearE();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
