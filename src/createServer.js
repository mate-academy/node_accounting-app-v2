'use strict';

const express = require('express');

const { userRouter } = require('./routes/user.route');
const { expenseRouter } = require('./routes/expense.route');
const { deleteAllUsers } = require('./services/user.service');
const { deleteAllExpenses } = require('./services/expense.service');

function createServer() {
  const app = express();

  deleteAllUsers();
  deleteAllExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

createServer();

module.exports = {
  createServer,
};
