'use strict';

const express = require('express');
const cors = require('cors');

const { router: userRouter } = require('./routes/users.js');
const { router: expenseRouter } = require('./routes/expenses');

const userService = require('./services/users');
const expenseService = require('./services/expenses');

function createServer() {
  userService.getInitial();
  expenseService.getInitial();

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
