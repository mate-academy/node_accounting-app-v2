'use strict';

const express = require('express');
const { userRouter } = require('./routers/userRouter');
const { expensesRouter } = require('./routers/expensesRouter');
const { setInitialExpenses } = require('./services/expense.service');
const { setInitialUsers } = require('./services/user.service');

function createServer() {
  const app = express();

  setInitialUsers();
  setInitialExpenses();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
