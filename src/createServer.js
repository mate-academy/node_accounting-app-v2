'use strict';

const express = require('express');
const { userRoute } = require('./routes/userRoute');
const { expenseRoute } = require('./routes/expenseRoute');
const userService = require('./services/userService');
const expenseService = require('./services/expenseService');

function createServer() {
  const app = express();

  userService.resetUsers();
  expenseService.resetExpenses();

  app.use('/users', express.json(), userRoute);
  app.use('/expenses', express.json(), expenseRoute);

  return app;
}

module.exports = {
  createServer,
};
