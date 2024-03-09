'use strict';

const express = require('express');
const usersRouter = require('./collections/users/users.route');
const expensesRouter = require('./collections/expenses/expenses.route');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter.router);
  app.use('/expenses', express.json(), expensesRouter.router);

  return app;
}

module.exports = { createServer };
