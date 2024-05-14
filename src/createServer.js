'use strict';

const express = require('express');
const { initUsers } = require('./services/userService');
const { initExpenses } = require('./services/expenseService');
const { userRouter } = require('./routes/userRoute');
const { expenseRouter } = require('./routes/expenseRoute');

function createServer() {
  initUsers();
  initExpenses();

  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
