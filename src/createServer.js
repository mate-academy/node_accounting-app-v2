'use strict';

const express = require('express');
const { usersRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expense.route');
const { usersService } = require('./services/user.service');
const { expensesService } = require('./services/expense.service');

function createServer() {
  const app = express();

  usersService.resetUsers();
  expensesService.resetExpenses();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
