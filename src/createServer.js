'use strict';

const express = require('express');
const {
  clearUsers,
} = require('./services/users.service');
const {
  clearExpenses,
} = require('./services/expenses.service');
const {
  router: usersRouter,
} = require('./routes/users.route');
const {
  router: expensesRouter,
} = require('./routes/expenses.route');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
