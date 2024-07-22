'use strict';

const express = require('express');
const { userRouter } = require('./routes/user.router');
const { expenseRouter } = require('./routes/expense.router');
const { resetData } = require('./helpers/resetData');

function createServer() {
  resetData();

  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
