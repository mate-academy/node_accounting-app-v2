'use strict';

const express = require('express');

const userServices = require('./services/users');
const expenseServices = require('./services/expenses');
const { userRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');

const jsonMiddleware = express.json();

function createServer() {
  const app = express();

  userServices.removeAllUsers();
  expenseServices.removeAllExpenses();

  app.use('/users', jsonMiddleware, userRouter);
  app.use('/expenses', jsonMiddleware, expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
