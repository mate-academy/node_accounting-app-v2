'use strict';

const express = require('express');
const { usersService } = require('./users/users.service');
const { expensesService } = require('./expenses/expenses.service');
const { usersRouter } = require('./users/users.router');
const { expensesRouter } = require('./expenses/expenses.router');

function createServer() {
  const app = express();

  app.use(express.json());

  expensesService.deleteExpenses();
  usersService.deleteUsers();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
