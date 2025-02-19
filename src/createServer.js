'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./router/users.router');
const { userService } = require('./services/users.service');
const { expensesService } = require('./services/expenses.service');
const { expensesRouter } = require('./router/expenses.router');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  userService.clear();
  expensesService.clear();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
