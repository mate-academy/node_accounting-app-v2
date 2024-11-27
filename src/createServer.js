'use strict';

const { expensesRouter } = require('./api/expenses.router');
const { usersRouter } = require('./api/users.router');
const { resetAllExpenses } = require('./services/expenses.service');
const { resetAllUsers } = require('./services/users.service');

const cors = require('cors');

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  resetAllUsers();
  resetAllExpenses();

  return app;
}

module.exports = {
  createServer,
};
