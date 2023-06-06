/* eslint-disable padding-line-between-statements */
'use strict';

const express = require('express');

const { userRouter } = require('./routes/user');
const { expenseRouter } = require('./routes/expense');
const { resetExpenses } = require('./services/expense');
const { resetUsers } = require('./services/user');

function createServer() {
  const app = express();

  resetExpenses();
  resetUsers();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
