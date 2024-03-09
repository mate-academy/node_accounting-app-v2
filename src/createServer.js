'use strict';

const express = require('express');
const userServices = require('./services/user.service');
const expenseServices = require('./services/expense.services');
const userRouter = require('./routes/users.routes');
const expensesRouter = require('./routes/expense.routes');

function createServer() {
  userServices.init();
  expenseServices.init();

  const app = express();

  app.use('/users', express.json(), userRouter.router);
  app.use('/expenses', express.json(), expensesRouter.router);

  return app;
}

module.exports = {
  createServer,
};
