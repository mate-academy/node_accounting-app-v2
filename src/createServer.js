'use strict';

const express = require('express');
const userService = require('./services/users');
const expenseService = require('./services/expenses');
const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');

function createServer() {
  userService.serverReload();
  expenseService.serverReload();

  const app = express();

  app.use(userRouter);
  app.use(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
