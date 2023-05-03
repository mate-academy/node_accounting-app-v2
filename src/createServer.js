'use strict';

const express = require('express');
const userRouter = require('./routers/user');
const expencesRouter = require('./routers/expenses');
const { resetUsers } = require('./services/user');
const { resetExpenses } = require('./services/expenses');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use('/users', userRouter);
  app.use('/expenses', expencesRouter);

  return app;
}

module.exports = {
  createServer,
};
