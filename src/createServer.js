'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const userService = require('./services/users');
const expenseService = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter.router);

  app.use('/expenses', express.json(), expensesRouter.router);

  userService.resetUsers();
  expenseService.resetExpenses();

  return app;
}

module.exports = {
  createServer,
};
