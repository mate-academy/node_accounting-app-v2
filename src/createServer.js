'use strict';

const express = require('express');
const cors = require('cors');
const usersService = require('./services/users');
const expensesService = require('./services/expenses');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  usersService.clearUsers();
  expensesService.clearExpenses();

  const app = express();

  app.use(cors());

  app.use('/users', usersRouter.router);
  app.use('/expenses', expensesRouter.router);

  return app;
}

module.exports = {
  createServer,
};
