'use strict';

const express = require('express');

const usersRoute = require('./users/routes/usersRoute').router;
const expensesRoute = require('./expenses/routes/expensesRoute').router;

const userService = require('./users/services/user.service').services;
const expensesService = require('./expenses/services/expense.service').services;

function createServer() {
  const app = express();

  userService.clearUsers();
  expensesService.clearExpenses();

  app.use(express.json());
  app.use('/users', usersRoute);
  app.use('/expenses', expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
