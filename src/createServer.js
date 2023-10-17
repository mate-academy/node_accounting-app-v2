'use strict';

const express = require('express');
const { usersRouter } = require('./routers/usersRouter');
const { expensesRouter } = require('./routers/expensesRouter');
const { clearUsers } = require('./services/usersService');
const { clearExpenses } = require('./services/expensesService');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
