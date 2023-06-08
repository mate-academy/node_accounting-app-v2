'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/users');
const { router: expensRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expensRouter);

  return app;
}

module.exports = {
  createServer,
};
