'use strict';

const express = require('express');
const userRoutes = require('./routes/users.route');
const expenseRoutes = require('./routes/expenses.route');
const userService = require('./services/users.service');
const expenseService = require('./services/expenses.service');

const createServer = () => {
  const app = express();

  app.use(express.json());

  userService.reset();
  expenseService.reset();

  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);

  return app;
};

module.exports = { createServer };
