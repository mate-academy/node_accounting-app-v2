'use strict';

const express = require('express');
const cors = require('cors');

const { users } = require('./services/users.js');
const { expenses } = require('./services/expenses.js');
const reset = require('./utils/resetData.js');
const { usersRouter } = require('./routers/users.js');
const { expensesRouter } = require('./routers/expenses.js');

function createServer() {
  const app = express();

  reset.resetAllUsers(users);
  reset.resetAllExpenses(expenses);

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
