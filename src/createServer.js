'use strict';

const express = require('express');
const { clear: clearUsers } = require('./services/users');
const { clear: clearExpanses } = require('./services/expenses');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  clearUsers();
  clearExpanses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
