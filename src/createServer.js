'use strict';

const express = require('express');
const { userRouter } = require('./routers/userRouter');
const { expenseRouter } = require('./routers/expenseRouter');
const userService = require('./services/userService');
const expenseService = require('./services/expenseService');

function createServer() {
  const users = [...userService.getAll()];

  users.forEach((u) => userService.remove(u.id));

  const expenses = [...expenseService.getAll()];

  expenses.forEach((e) => expenseService.remove(e.id));

  const app = express();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
