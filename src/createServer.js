/* eslint-disable no-console */
'use strict';

const express = require('express');

function createServer() {
  const { router: userRouter } = require('./routes/usersRoute');
  const { router: expenseRouter } = require('./routes/expensesRoute');

  const userService = require('./services/usersService');
  const expenseService = require('./services/expensesService');

  const app = express();

  userService.deleteAll();
  expenseService.deleteAll();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
