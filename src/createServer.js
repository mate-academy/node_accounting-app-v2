'use strict';

const express = require('express');
const userFunctions = require('./functions/users.js');
const userRouter = require('./routers/userRouter.js');
const expenseFunctions = require('./functions/expense.js');
const expenseRouter = require('./routers/expenseRouter.js');

function createServer() {
  const app = express();

  app.use('/expenses', express.json(), expenseRouter);
  expenseFunctions.init();

  app.use('/users', express.json(), userRouter);
  userFunctions.init();

  return app;
}

module.exports = {
  createServer,
};
