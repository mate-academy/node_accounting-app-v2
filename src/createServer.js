'use strict';

const express = require('express');

const { userRouter } = require('./routes/user.routes');
const { expenseRouter } = require('./routes/expense.routes');
const { makeUsersEmpty } = require('./services/user.service');
const { makeExpensesEmpty } = require('./services/expense.service');

function createServer() {
  const app = express();

  makeUsersEmpty();
  makeExpensesEmpty();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
