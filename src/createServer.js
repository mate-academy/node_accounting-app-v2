'use strict';

const express = require('express');
const { router: expensesRouter } = require('./routers/expenses');
const { router: usersRouter } = require('./routers/users');
const { clearDatabase: clearExpenses } = require('./services/expenses');
const { clearDatabase: clearUsers } = require('./services/users');

function createServer() {
  const app = express();

  app.use(express.json());

  clearExpenses();
  clearUsers();

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
