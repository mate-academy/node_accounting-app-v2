'use strict';

const express = require('express');
const cors = require('cors');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');

function createServer() {
  const app = express();

  usersService.reset();
  expensesService.reset();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
