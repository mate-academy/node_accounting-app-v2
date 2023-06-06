'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routs/users');
const { router: expensesRouter } = require('./routs/expenses');
const userService = require('./services/users.js');
const expensesService = require('./services/expenses.js');

function createServer() {
  const app = express();

  expensesService.reset();
  userService.reset();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
