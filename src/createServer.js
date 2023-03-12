'use strict';

const express = require('express');
const cors = require('cors');
const userService = require('./services/users');
const expenseService = require('./services/expenses');
const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');

function createServer() {
  userService.initiate();
  expenseService.initiate();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
