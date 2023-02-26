'use strict';

const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

const userServices = require('./services/users');
const expensesServices = require('./services/expenses');

function createServer() {
  const app = express();

  userServices.clear();
  expensesServices.clear();

  app.use(cors());

  app.use('/users', userRouter.router);
  app.use('/expenses', expensesRouter.router);

  return app;
}

module.exports = {
  createServer,
};
