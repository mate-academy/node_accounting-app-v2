'use strict';

const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');
const userService = require('./services/users.js');
const expensesServise = require('./services/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  userService.deleteAllUsers();
  expensesServise.deleteAllExpenses();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
