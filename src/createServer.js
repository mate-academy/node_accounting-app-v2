'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoute');

const userService = require('./services/userService');
const expenseService = require('./services/expenseService');
const expenseRouter = require('./routes/expenseRouter');

function createServer() {
  userService.reset();
  expenseService.reset();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
