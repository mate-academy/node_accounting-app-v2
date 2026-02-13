'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/routeUsers');
const expensesRouter = require('./routes/routeExpenses');
const userService = require('./services/serviceUsers');
const expenseService = require('./services/serviceExpenses');

function createServer() {
  userService.clearUsers();
  expenseService.clearExpenses();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
