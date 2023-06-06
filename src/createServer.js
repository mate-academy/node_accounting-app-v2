'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/userRouter');
const { expenseRouter } = require('./routes/expenseRouter');
const { resetUsers } = require('./services/userServices');
const { resetExpenses } = require('./services/expenseServices');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  resetUsers();
  resetExpenses();

  return app;
}

module.exports = {
  createServer,
};
