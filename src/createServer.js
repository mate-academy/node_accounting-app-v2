const express = require('express');
const cors = require('cors');
const { userRouter } = require('./users/users.router');
const BaseService = require('./utils/baseService');
const { expenseRouter } = require('./expense/expense.router');

function createServer() {
  const app = express();

  BaseService.clearAllInstances();

  app.use(express.json());
  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = { createServer };
