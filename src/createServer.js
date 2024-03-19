'use strict';

const express = require('express');
const cors = require('cors');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');
const { router: userRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');

function createServer() {
  const app = express();

  app.use(cors());

  userService.clearAll();
  expenseService.clearAll();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
