'use strict';

const userRouter = require('./routers/users.router');
const expenseRouter = require('./routers/expenses.router');
const userServices = require('./services/users.services');
const expenseServices = require('./services/expenses.services');

const express = require('express');

function createServer() {
  userServices.resetUser();
  expenseServices.resetExpenses();

  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
