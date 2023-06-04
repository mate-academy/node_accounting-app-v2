'use strict';

const express = require('express');

const { todosRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');

const userService = require('./services/users');
const expenseService = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(todosRouter);
  app.use(expenseRouter);

  userService.eraseData();
  expenseService.eraseData();

  return app;
}

module.exports = {
  createServer,
};
