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

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
