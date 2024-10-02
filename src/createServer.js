'use strict';

const cors = require('cors');
const express = require('express');
const { router: expenseRouter } = require('./routes/expenseRouter');
const { router: userRouter } = require('./routes/userRouter');
const expenseService = require('./services/expenseService');
const userService = require('./services/userService');

function createServer() {
  const app = express();

  userService.reset();
  expenseService.reset();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
