'use strict';

const { usersRouter } = require('./routes/usersRoute');
const { expensesRouter } = require('./routes/expensesRoute');
const { clear } = require('./services/usersService');
const { clearExpenses } = require('./services/expensesService');
const express = require('express');

function createServer() {
  const app = express();

  clearExpenses();
  clear();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
