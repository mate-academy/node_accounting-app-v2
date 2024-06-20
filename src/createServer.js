'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/userRoute');
const { expenseRouter } = require('./routes/expenseRoute');
const userService = require('./services/userService');
const expenseSrvice = require('./services/expensesService');

function createServer() {
  const app = express();

  app.use(cors());
  userService.start();
  expenseSrvice.start();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
