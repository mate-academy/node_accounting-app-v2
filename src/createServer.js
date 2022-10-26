'use strict';

const express = require('express');
const cors = require('cors');
const { cleanUsersArray } = require('./services/users');
const { clearExpensesArray } = require('./services/expenses');
const { usersRouter } = require('./routes/users.js');
const { expensesRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', usersRouter);

  cleanUsersArray();

  app.use('/expenses', expensesRouter);

  clearExpensesArray();

  return app;
}

module.exports = {
  createServer,
};
