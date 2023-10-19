'use strict';

const cors = require('cors');
const userRouter = require('./users/routes/user.route.js');
const expnseRouter = require('./expenses/routes/expense.route.js');
const userService = require('../src/users/services/user.service');
const expenseService = require('../src/expenses/services/expense.service');

const express = require('express');

function createServer() {
  const app = express();

  app.use(cors());

  userService.clearState();
  expenseService.clearState();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expnseRouter);

  return app;
}

module.exports = {
  createServer,
};
