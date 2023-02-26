'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users').router;
const expensesRouter = require('./routes/expenses').router;
const userModule = require('./services/users');
const expensesModule = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  userModule.setInitial();
  expensesModule.setInitial();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
