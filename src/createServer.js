'use strict';

const express = require('express');

const userServices = require('./services/users');
const expenseServices = require('./services/expenses');
const { userRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  userServices.removeAllUsers();
  expenseServices.removeAllExpenses();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
