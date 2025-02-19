'use strict';

const express = require('express');
const { routerUsers } = require('./routes/user.route');
const { routerExpenses } = require('./routes/expense.router');
const { resetUsers } = require('./services/user.service');
const { resetExpenses } = require('./services/expenses.service');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use('/users', express.json(), routerUsers);
  app.use('/expenses', express.json(), routerExpenses);

  return app;
}

module.exports = {
  createServer,
};
