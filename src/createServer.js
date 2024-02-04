'use strict';

const express = require('express');

function createServer() {
  const usersRoute = require('./routes/users.route');
  const expensesRoute = require('./routes/expenses.route');
  const usersService = require('./services/users.service');
  const expensesService = require('./services/expenses.service');

  const app = express();

  usersService.clearUsers();
  expensesService.clearExpenses();

  app.use('/users', usersRoute);
  app.use('/expenses', expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
