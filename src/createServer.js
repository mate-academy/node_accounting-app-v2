'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/user.route.js');
const { router: expensesRouter } = require('./routes/expenses.route.js');

const { expensesService } = require('./services/expenses.service.js');
const { userService } = require('./services/user.service.js');

function createServer() {
  const app = express();

  expensesService.clear();
  userService.clear();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
