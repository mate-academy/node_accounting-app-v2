'use strict';

const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const expensesRoutes = require('./routes/expenses');
const userService = require('./services/users');
const expenseService = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  userService.removeAllUsers();

  expenseService.removeAllExpenses();

  app.use('/users', usersRoutes);

  app.use('/expenses', expensesRoutes);

  return app;
};

module.exports = {
  createServer,
};
