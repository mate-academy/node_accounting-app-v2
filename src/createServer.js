'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users.js');
const { router: expensesRouter } = require('./routes/expense.js');

const { usersServices } = require('./services/users.js');
const { expensesServices } = require('./services/expenses.js');

function createServer() {
  const app = express();

  usersServices.setInitUsers();
  expensesServices.setInitSxpanses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
