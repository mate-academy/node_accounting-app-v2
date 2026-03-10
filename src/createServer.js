'use strict';

const express = require('express');
const userRouter = require('./routes/userRouter');
const expenseRouter = require('./routes/expenseRouter');
const userService = require('./services/userService');
const expenseService = require('./services/expenseService');

function createServer() {
  // Reset in-memory stores on each server creation (fresh state per test)
  userService.reset();
  expenseService.reset();

  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
