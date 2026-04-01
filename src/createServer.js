'use strict';

const usersRouter = require('./routes/users.route.js');
const expensesController = require('./routes/expenses.route.js');
const usersService = require('./services/users.service.js');
const expensesService = require('./services/expenses.service.js');
const express = require('express');

function createServer() {
  const app = express();

  usersService.reset();
  expensesService.reset();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesController);

  return app;
}

module.exports = {
  createServer,
};
