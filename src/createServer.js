'use strict';

const express = require('express');
const userServise = require('./services/user.service.js');
const expenseServise = require('./services/expense.service.js');
const userRouter = require('./routes/user.route.js');
const expenseRouter = require('./routes/expense.route.js');

const { initUsers } = userServise;
const { initExpenses } = expenseServise;

function createServer() {
  initUsers();
  initExpenses();

  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
