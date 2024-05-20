'use strict';

const express = require('express');

const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');
const usersRoute = require('./routes/users.route');
const expensesRoute = require('./routes/expenses.route');

function createServer() {
  usersService.initialise();
  expensesService.initialise();

  const app = express();

  app.use('/users', usersRoute.route);
  app.use('/expenses', expensesRoute.route);

  return app;
}

module.exports = {
  createServer,
};
