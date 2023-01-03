'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const { clear: clearUsers } = require('./services/users');
const { clear: clearExpenses } = require('./services/expenses');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
