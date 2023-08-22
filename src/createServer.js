/* eslint-disable max-len */
'use strict';

const express = require('express');
const { clearUsers } = require('./services/users.service');
const { clearExpenses } = require('./services/expenses.service');

const userRouter = require('./routes/users.js');
const expenseRouter = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());

  clearUsers();
  clearExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
