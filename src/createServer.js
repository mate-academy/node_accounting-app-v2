'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expenses.route');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use(cors());
  usersService.clearUsers();
  app.use('/users', express.json(), usersRouter);
  expensesService.clearExpenses();
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
