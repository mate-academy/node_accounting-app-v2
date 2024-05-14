'use strict';

const express = require('express');
const userRoute = require('./routes/user.route');
const expensesRoute = require('./routes/expenses.route');
const startUserService = require('./services/user.service');
const startExpensesService = require('./services/expenses.service');

function createServer() {
  const app = express();

  startUserService.start();
  startExpensesService.start();

  app.use('/users', express.json(), userRoute);
  app.use('/expenses', express.json(), expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
