'use strict';

const express = require('express');

const { router: userRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');
const { reset: clearUsers } = require('./serveces/user.serveces');
const { reset: clearExpenses } = require('./serveces/expense.serveces');

const app = express();

function createServer() {
  clearUsers();
  clearExpenses();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
