'use strict';

const express = require('express');
const cors = require('cors');
const { routerUsers } = require('./routes/users');
const { routerExpenses } = require('./routes/expenses');
const { userService } = require('./services/users');
const { expenseService } = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  userService.getInitialValue();
  expenseService.getInitialValue();

  app.use('/users', routerUsers);
  app.use('/expenses', routerExpenses);

  return app;
}

module.exports = {
  createServer,
};
