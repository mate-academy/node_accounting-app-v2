'use strict';

const express = require('express');
const { userRouter } = require('./routes/users.js');
const { expensesRouter } = require('./routes/expenses');
const { usersService } = require('./services/users');
const { expensesService } = require('./services/expenses');

function createServer() {
  const app = express();

  usersService.setInitial();
  expensesService.setInitial();
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
