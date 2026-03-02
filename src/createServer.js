'use strict';

const express = require('express');
const userRoutes = require('./routes/users.routes');
const expenseRoutes = require('./routes/expenses.routes');

const userService = require('./services/users.service');
const expenseService = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use(express.json());

  userService.resetUsers();
  expenseService.resetExpenses();

  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);

  return app;
}

module.exports = {
  createServer,
};
