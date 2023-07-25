'use strict';

const express = require('express');
const { userRouter } = require('./routers/user.router');
const { expenseRouter } = require('./routers/expense.router');

function createServer() {
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

createServer();

module.exports = {
  createServer,
};
