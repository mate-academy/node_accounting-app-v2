/* eslint-disable no-console */
'use strict';

const express = require('express');

function createServer() {
  const { router: userRouter } = require('./routes/usersRoute');
  const { router: expenseRouter } = require('./routes/expensesRoute');

  const app = express();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
