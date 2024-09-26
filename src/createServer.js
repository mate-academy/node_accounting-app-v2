'use strict';

const express = require('express');
const { expenseRouter } = require('./routes/expenseRouter');
const { userRouter } = require('./routes/usersRoute');
const { deleteAllExpenses } = require('./services/expenseService');
const { deleteAllUsers } = require('./services/usersService');

function createServer() {
  const app = express();

  deleteAllUsers();
  deleteAllExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
