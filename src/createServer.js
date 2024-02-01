'use strict';

const express = require('express');
const { resetUsers } = require('./servises/user.services');
const { resetExpenses } = require('./servises/expense.services');
const { userRouter } = require('./routes/user.routes');
const { expenseRouter } = require('./routes/expense.routes');

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
