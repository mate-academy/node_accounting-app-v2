'use strict';

const { router: userRouter } = require('./routes/user.router.js');
const { router: expenseRouter } = require('./routes/expense.router.js');
const cors = require('cors');
const express = require('express');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = { createServer };
