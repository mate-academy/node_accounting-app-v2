'use strict';

const userServices = require('../src/sevices/users.service');
const userRouter = require('../src/routes/user.routes');
const expensesRouter = require('../src/routes/expenses.routes');
const expensesServises = require('../src/sevices/expenses.service');

const express = require('express');

function createServer() {
  const app = express();

  userServices.clear();
  expensesServises.clear();

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
