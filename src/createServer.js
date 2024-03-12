'use strict';

const express = require('express');
const { router: routerUsers } = require('./routes/users.route');
const { router: routerExpenses } = require('./routes/expenses.route');

const { init: initUsers } = require('./services/user.service');
const { init: initExpense } = require('./services/expenses.service');

function createServer() {
  initUsers();
  initExpense();

  const app = express();

  app.use('/users', express.json(), routerUsers);
  app.use('/expenses', express.json(), routerExpenses);

  return app;
}

module.exports = {
  createServer,
};
