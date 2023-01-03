'use strict';

const express = require('express');

const userRouter = require('./routes/users.js');
const userServise = require('./services/users.js');

const expenseServise = require('./services/expenses.js');
const expenseRouter = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);
  userServise.initializeUsers();

  app.use('/expenses', expenseRouter);
  expenseServise.initializeExpenses();

  return app;
}

module.exports = {
  createServer,
};
