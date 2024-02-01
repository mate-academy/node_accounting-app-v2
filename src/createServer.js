'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const expenswRouter = require('./routes/expense.route');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenswRouter);

  return app;
}

module.exports = {
  createServer,
};
