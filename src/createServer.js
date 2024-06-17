/* eslint-disable no-console */
'use strict';

const express = require('express');
const { userRouter } = require('./routers/user.router');
const { expensesRouter } = require('./routers/expenses.router');
const expenseServices = require('./services/expenses.service');
const usersServices = require('./services/user.service');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/', (request, response) => {
    response.send('Hello');
  });

  expenseServices.reset();
  usersServices.reset();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
