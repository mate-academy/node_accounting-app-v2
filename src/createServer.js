'use strict';

const express = require('express');
const { userRouter } = require('./routers/user-router');
const { expenseRouter } = require('./routers/expense-router');
const { resetUsersService } = require('./services/user-service');
const { resetExpensesService } = require('./services/expense-services');

function createServer() {
  const app = express();

  resetUsersService();
  resetExpensesService();

  app.use(express.json());

  app.use(userRouter);
  app.use(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
