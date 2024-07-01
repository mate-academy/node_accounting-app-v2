'use strict';

const express = require('express');
const cors = require('cors');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');
const userRouter = require('./routes/user.router');
const expenseRouter = require('./routes/expense.router');

function createServer() {
  const app = express();

  userService.initUsers();
  expenseService.initExpenses();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
