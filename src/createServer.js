'use strict';

const express = require('express');
const { userRoute } = require('./routes/users.js');
const { expenseRoute } = require('./routes/expenses.js');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];

  app.use(express.json());

  const userRouter = express.Router();
  const expenseRouter = express.Router();

  userRoute(userRouter, users);
  expenseRoute(expenseRouter, users, expenses);

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
