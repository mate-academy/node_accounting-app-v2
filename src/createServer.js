'use strict';

const express = require('express');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');
const { usersRoute } = require('./routes/users.route');
const { expensesRoute } = require('./routes/expenses.route');

function createServer() {
  const app = express();

  app.use(express.json());

  usersService.reset();
  expensesService.reset();

  app.use('/users', usersRoute);
  app.use('/expenses', expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
