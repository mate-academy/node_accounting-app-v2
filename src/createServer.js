'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/userRouter');
const { router: expenseRouter } = require('./routes/expenseRouter');
const userService = require('./services/userService');
const expenseService = require('./services/expenseService');

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
