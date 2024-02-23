'use strict';

const express = require('express');
const cors = require('cors');
const userService = require('./services/user.service');
const expensesService = require('./services/expenses.service');
const { userRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expenses.route');

function createServer() {
  userService.init();
  expensesService.init();

  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
