'use strict';

const express = require('express');
const { usersRouter } = require('./Users/users.router');
const { expensesRouter } = require('./Expenses/expenses.router');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
