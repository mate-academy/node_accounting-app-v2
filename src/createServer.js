'use strict';

const express = require('express');
const cors = require('cors');
const { userServices } = require('./services/usersServices');
const { expensesServices } = require('./services/expensesServices');
const userRouter = require('./routers.js/userRouter');
const expenseRouter = require('./routers.js/expenseRouter');

function createServer() {
  const app = express();

  userServices.getDefault();
  expensesServices.getDefault();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
