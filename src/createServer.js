'use strict';

const express = require('express');

const userService = require('./services/user.service.js');
const expenseService = require('./services/expense.service.js');

const { userRouter } = require('./routes/user.routes.js');
const { expenseRouter } = require('./routes/expense.routes.js');

function createServer() {
  const app = express();

  userService.resetUsers();
  expenseService.resetExpenses();

  app.use(express.json());

  app.use(userRouter);
  app.use(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
