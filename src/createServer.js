'use strict';

const express = require('express');
const { InitUserRoutes } = require('./user.routes');
const { InitExpenseRoute } = require('./expense.routes');

function createServer() {
  const users = [];
  const expenses = [];

  const storage = {
    users,
    expenses,
  };

  const app = express();

  const userRouter = express.Router();
  const expenseRouter = express.Router();

  InitUserRoutes(userRouter, storage);
  InitExpenseRoute(expenseRouter, storage);

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
