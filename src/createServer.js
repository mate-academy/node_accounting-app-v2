'use strict';

const express = require('express');
const userRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const app = express();

function createServer() {
  app.use('/expenses', expensesRouter);

  app.use('/users', userRouter);

  return app;
}

module.exports = {
  createServer,
};
