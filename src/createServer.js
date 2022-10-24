'use strict';

const { clearUsersArray } = require('./controllers/users');
const { clearExpensesArray } = require('./controllers/expenses');
const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

const express = require('express');

function createServer() {
  const app = express();

  clearUsersArray();
  clearExpensesArray();
  app.use('/users', express.json(), usersRouter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
