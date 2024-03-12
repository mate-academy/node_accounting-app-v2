/* eslint-disable no-console */
'use strict';

const express = require('express');
const { userRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expense.route');
const { setInitialValue } = require('./services/user.service');
const { setInitialExpense } = require('./services/expense.service');

function createServer() {
  const app = express();

  setInitialValue();
  setInitialExpense();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
