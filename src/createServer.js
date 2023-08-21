'use strict';

const express = require('express');
const { router: userRouter } = require('./modules/user/user.router');
const { router: expensesRouter } = require('./modules/expense/expense.router');

function createServer() {
  const app = express();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
