'use strict';

const express = require('express');
const { router: routerUsers } = require('./users/users.route');
const { router: routerExpenses } = require('./expense/expenses.route');

const { init: initUsers } = require('./users/user.service');
const { init: initExpense } = require('./expense/expenses.service');

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
