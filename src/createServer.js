'use strict';

const express = require('express');

const { router: usersRouter } = require('./routes/user.route');
const { router: expensesRouter } = require('./routes/expenses.route');

const usersService = require('./services/users.services');
const expensesService = require('./services/expenses.services');

function createServer() {
  const app = express();

  usersService.initUsers();
  expensesService.initExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
