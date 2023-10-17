'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.routes');
const { expensesRouter } = require('./routes/expenses.routes');
const { expensesService } = require('../services/expenses.services');
const { userService } = require('../services/users.services');

function createServer() {
  const app = express();

  userService.clear();
  expensesService.clear();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
