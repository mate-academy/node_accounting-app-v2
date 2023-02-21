'use strict';

const express = require('express');
const cors = require('cors');

const userService = require('./services/users.js');
const expensesService = require('./services/expenses.js');

const { userRouter } = require('./routes/users.js');
const { expenseRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  userService.clear();
  expensesService.clear();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
