'use strict';

const express = require('express');
const cors = require('cors');

const { service: userService } = require('./services/users');
const { service: expenseService } = require('./services/expenses');
const { router: userRouter } = require('./routes/users');
const { router: expenseRouter } = require('./routes/expenses');

function createServer() {
  userService.reset();
  expenseService.reset();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
