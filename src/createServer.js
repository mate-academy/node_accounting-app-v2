/* eslint-disable prettier/prettier */
'use strict';

const { userRouter } = require('./routes/user.route');
const { expenseRouter } = require('./routes/expense.route');
const expenseService = require('./services/expenseService');
const userServise = require('./services/userService');

const express = require('express');

function createServer() {
  const app = express();

  expenseService.reset();
  userServise.reset();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
