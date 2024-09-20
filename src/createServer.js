'use strict';

const express = require('express');
const { userRoute } = require('./routes/userRoute.js');
const { expenceRoute } = require('./routes/expenseRoute.js');
const userService = require('./services/userService.js');
const expenceService = require('./services/expenseService.js');

function createServer() {
  const app = express();

  userService.resetUsers();
  expenceService.resetExpenses();

  app.use('/users', express.json(), userRoute);
  app.use('/expenses', express.json(), expenceRoute);

  return app;
}

module.exports = {
  createServer,
};
