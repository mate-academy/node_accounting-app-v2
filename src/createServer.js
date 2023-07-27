'use strict';

const express = require('express');
const cors = require('cors');

const expenseRouter = require('./routes/expense');
const userRouter = require('./routes/users');
const { setInitialExpenses } = require('./services/expense');
const { setInitialUsers } = require('./services/user');

function createServer() {
  const app = express();

  setInitialUsers();
  setInitialExpenses();

  app.use(cors(), express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
