'use strict';

const express = require('express');

const { router: usersRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expenses.route');

const usersServices = require('./services/users.service');
const expensesServices = require('./services/expenses.service');

function createServer() {
  const app = express();

  usersServices.reset();
  expensesServices.reset();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
