'use strict';

const express = require('express');
const { clearUsers } = require('./services/user.service');
const { clearExpenses } = require('./services/expense.service');
const { router: userRouter } = require('./routes/user.routes');
const { router: expenseRouter } = require('./routes/expense.routes');

function createServer() {
  clearUsers();
  clearExpenses();

  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);

  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
