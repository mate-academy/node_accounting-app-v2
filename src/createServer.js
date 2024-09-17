'use strict';

const express = require('express');
const { routerUsers } = require('./routes/users.route');
const { routerExpenses } = require('./routes/expenses.route');
const { resetUsers } = require('./services/users.service');
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
