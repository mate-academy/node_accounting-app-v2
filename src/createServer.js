'use strict';

const usersService = require('./services/users.service');
const expenseService = require('./services/expenses.service');
const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routers/users.router');
const { router: expensesRouter } = require('./routers/expenses.router');

function createServer() {
  const app = express();

  app.use(cors());
  usersService.deleteAll();
  expenseService.deleteAll();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
