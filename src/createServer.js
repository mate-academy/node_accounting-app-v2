'use strict';

const express = require('express');
const userService = require('./services/userService');
const expenseService = require('./services/expenseService');
const { userRouter } = require('./routes/userRoute');
const { expenseRouter } = require('./routes/expenseRoute');

function createServer() {
  userService.init();
  expenseService.init();

  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
