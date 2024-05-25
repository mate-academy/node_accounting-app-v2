'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route.js');
const expensesRouter = require('./routes/expenses.route.js');
const { resetAllUsers } = require('./services/users.service.js');
const { resetAllExpenses } = require('./services/expenses.service.js');

function createServer() {
  const app = express();

  resetAllUsers();
  resetAllExpenses();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
