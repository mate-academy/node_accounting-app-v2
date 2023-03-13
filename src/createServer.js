'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const userService = require('./services/users');
const expenseServices = require('./services/expenses');

function createServer() {
  const app = express();

  userService.clearUsers();
  expenseServices.clearExpences();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
