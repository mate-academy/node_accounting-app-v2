'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');
const { usersService } = require('./services/users.service');
const { expensesService } = require('./services/expenses.service');

function createServer() {
  usersService.resetUsers();
  expensesService.resetExpenses();

  const app = express();

  app.use(express.json());

  app.use(usersRouter);
  app.use(expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
