'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/users');
const { router: expenseRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
