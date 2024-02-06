'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users.route');
const { router: expenseRouter } = require('./routes/expenses.route');
const usersService = require('./services/users.service');
const expenseService = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  usersService.removeAll();

  app.use('/expenses', express.json(), expenseRouter);
  expenseService.removeAll();

  return app;
}

module.exports = {
  createServer,
};
