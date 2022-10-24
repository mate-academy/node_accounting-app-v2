'use strict';

const express = require('express');
const userRouter = require('./routers/userRouter.js');
const expenseRouter = require('./routers/expenseRouter.js');
const userServise = require('./services/users.js');
const expenseServise = require('./services/expenses.js');

function createServer() {
  const app = express();

  app.use('/expenses', express.json(), expenseRouter);
  expenseServise.init();

  app.use('/users', express.json(), userRouter);
  userServise.init();

  return app;
};

module.exports = {
  createServer,
};
