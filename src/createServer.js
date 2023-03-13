'use strict';

const express = require('express');
const cors = require('cors');
const userServices = require('./services/users');
const expenseServices = require('./services/expenses');
const userRouter = require('./routes/users');
const expressRouter = require('./routes/expenses');

function createServer() {
  userServices.init();
  expenseServices.init();

  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expressRouter);

  return app;
}

module.exports = {
  createServer,
};
