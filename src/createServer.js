'use strict';

const express = require('express');

const { usersRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');

const userService = require('./services/users');
const expenseService = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(usersRouter);
  app.use(expenseRouter);

  userService.eraseData();
  expenseService.eraseData();

  return app;
}

module.exports = {
  createServer,
};
