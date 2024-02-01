'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');
const { reset: resetUsers } = require('./services/user.service.js');
const { reset: resetExpenses } = require('./services/expense.service.js');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use(express.json());

  app.use('/users', userRouter);

  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
