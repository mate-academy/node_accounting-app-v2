'use strict';

const express = require('express');
const { userRouter } = require('./routes/user.route');
const { expenseRouter } = require('./routes/expense.route');
const { userInit } = require('./services/user.service');
const { expenseInit } = require('./services/expense.service');

function createServer() {
  const app = express();

  userInit();
  expenseInit();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
