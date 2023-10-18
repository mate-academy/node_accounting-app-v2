'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const expensesService = require('./services/expenses.service');
const usersService = require('./services/users.service');

function createServer() {
  const app = express();

  app.use(cors());

  usersService.clear();
  expensesService.clear();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
