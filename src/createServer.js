'use strict';

const express = require('express');
const { router: users } = require('./routes/users');
const { router: expenses } = require('./routes/expense');
const { userService } = require('./services/userService');
const { expenseService } = require('./services/expenseService');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', users);
  app.use('/expenses', expenses);

  userService.clearAll();
  expenseService.clearAll();

  return app;
}

module.exports = {
  createServer,
};
