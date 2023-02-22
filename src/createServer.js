'use strict';

const express = require('express');
const expensesServices = require('./services/expenses.js');
const usersServices = require('./services/users.js');
const { router: expensesRouter } = require('./routes/expenses.js');
const { router: usersRouter } = require('./routes/users.js');

function createServer() {
  const app = express();

  expensesServices.clear();
  usersServices.clear();

  app.use(expensesRouter);
  app.use(usersRouter);

  return app;
}

module.exports = {
  createServer,
};
