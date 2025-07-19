'use strict';

const express = require('express');
const userService = require('./services/userService');
const expenseService = require('./services/expenseService');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());

  userService.resetData();
  expenseService.resetData();

  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);

  return app;
}

module.exports = {
  createServer,
};
