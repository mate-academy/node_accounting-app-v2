/* eslint-disable function-paren-newline */
'use strict';

const express = require('express');
const expenses = require('./services/expenses.service');
const userRouter = require('./routes/usersRoute');
const expensesRouter = require('./routes/expensesRoute');
const users = require('./services/users.service');

function createServer() {
  const app = express();

  expenses.resetDate();
  users.resetDate();

  app.use(express.json());

  app.use('/users', userRouter.router);
  app.use('/expenses', expensesRouter.router);

  return app;
}

module.exports = {
  createServer,
};
