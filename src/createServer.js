'use strict';

const express = require('express');
const cors = require('cors');
const userService = require('./services/users.js');
const expensesService = require('./services/expenses.js');

const userRouter = require('./routers/users.js');
const expenseRouter = require('./routers/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  userService.reset();
  expensesService.reset();

  return app;
}

module.exports = {
  createServer,
};
