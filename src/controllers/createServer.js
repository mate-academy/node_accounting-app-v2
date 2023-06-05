'use strict';

const express = require('express');
const cors = require('cors');

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const { router: usersRouter } = require('../routes/users');
const { router: expensesRouter } = require('../routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  userService.setDefaultUsers();
  expensesService.setDefaultExpenses();

  return app;
}

module.exports = {
  createServer,
};
