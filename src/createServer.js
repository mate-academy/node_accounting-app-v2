'use strict';

const express = require('express');
const cors = require('cors');

const { users } = require('./services/users');
const { expenses } = require('./services/expenses');
const { resetAllUsers } = require('./utils/resetData');
const { resetAllExpenses } = require('./utils/resetData');

const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  resetAllUsers(users);
  resetAllExpenses(expenses);

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
