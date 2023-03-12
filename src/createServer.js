'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/user.js');
const { expenseRouter } = require('./routes/expense.js');
const { userService } = require('./services/user.js');
const { expenseService } = require('./services/expense.js');

function createServer() {
  userService.getFirst();
  expenseService.getFirst();

  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
