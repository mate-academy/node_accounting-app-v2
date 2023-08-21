'use strict';

const userService = require('./services/users.js');
const expenseService = require('./services/expenses.js');
const { userRouter } = require('./routes/users.js');
const { expenseRouter } = require('./routes/expenses.js');
const express = require('express');
const cors = require('cors');

function createServer() {
  userService.resetAllUsers();
  expenseService.resetAllExpenses();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
