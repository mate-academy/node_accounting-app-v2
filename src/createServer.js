'use strict';

const cors = require('cors');
const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');

const usersServices = require('./services/users.service');
const expensesServices = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  // For tests
  usersServices.reset();
  expensesServices.reset();

  return app;
}

module.exports = {
  createServer,
};
