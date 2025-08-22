'use strict';

const express = require('express');

const userService = require('./services/userService');
const expenseService = require('./services/expenseService');

const userRouter = require('./routes/userRouter');
const expenseRouter = require('./routes/expenseRouter');

function createServer() {
  userService.resetData();
  expenseService.resetData();

  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
