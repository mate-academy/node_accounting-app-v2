'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

function createServer() {
  userService.reset();
  expenseService.reset();

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
