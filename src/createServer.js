'use strict';

const express = require('express');
const userRouter = require('./usersRouter');
const expensesRouter = require('./expensesRouter');

const { resetUsers } = require('./usersServices');
const { resetExpenses } = require('./expensesServices');

function createServer() {
  resetUsers();
  resetExpenses();

  const app = express();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
