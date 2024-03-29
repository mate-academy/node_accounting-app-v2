'use strict';

const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');
const userServises = require('./services/user.service');
const expenseServises = require('./services/expense.servise');

const express = require('express');
const cors = require('cors');

function createServer() {
  userServises.init();
  expenseServises.init();

  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
