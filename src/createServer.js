'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const expensesService = require('./services/expenses');
const usersService = require('./services/users');

function createServer() {
  const app = express();

  expensesService.resetExpenses();
  usersService.resetUsers();

  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
