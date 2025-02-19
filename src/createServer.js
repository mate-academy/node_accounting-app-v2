'use strict';

const express = require('express');

const { router: userRouter } = require('./routes/user.route');
const { router: expensesRouter } = require('./routes/expense.route');
const userService = require('./services/user.service');
const expensesService = require('./services/expense.service');

function createServer() {
  const app = express();

  userService.initialize();
  expensesService.initialize();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
