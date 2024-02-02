'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const expenswRouter = require('./routes/expense.route');
const { expenses } = require('./services/expense.service');
const { users } = require('./services/user.service');

function createServer() {
  const app = express();

  expenses.splice(0);
  users.splice(0);

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenswRouter);

  return app;
}

module.exports = {
  createServer,
};
