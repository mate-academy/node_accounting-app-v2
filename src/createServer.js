'use strict';

const express = require('express');
const { clearAllUsers } = require('./services/user.service.js');
const { userRouter } = require('./routes/user.route.js');
const { clearAllExpenses } = require('./services/expense.service.js');
const { expenseRouter } = require('./routes/expense.route.js');

function createServer() {
  const app = express();

  clearAllUsers();
  clearAllExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
