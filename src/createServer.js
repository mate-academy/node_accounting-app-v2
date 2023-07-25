/* eslint-disable max-len */
'use strict';

const express = require('express');
const { router: userRouter } = require('./routers/users.router');
const { router: expenseRouter } = require('./routers/expenses.router');

const createServer = () => {
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

createServer();

module.exports = {
  createServer,
};
