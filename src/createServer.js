'use strict';

const { clearAll: clearAllUsers } = require('./services/users.services');
const { clearAll: clearAllExpenses } = require('./services/expenses.services');
const express = require('express');
const userRouter = require('./routers/users.router');
const expensesRouter = require('./routers/expenses.router');

function createServer() {
  const app = express();

  clearAllUsers();
  clearAllExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
