/* eslint-disable no-console */
'use strict';

const express = require('express');
const usersService = require('../services/users');
const expensessService = require('../services/expenses.js');
const userRouter = require('../routes/users.js');
const expensesRouter = require('../routes/expenses.js');

function createServer() {
  const app = express();

  usersService.clearUsers();
  expensessService.clearExpenses();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
