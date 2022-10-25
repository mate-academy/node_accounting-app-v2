'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/users');
const { expenseRouter } = require('./routes/expenses');
const userServices = require('./services/users');
const expenseServices = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use(express.json(), userRouter);
  userServices.initUser();

  app.use(express.json(), expenseRouter);
  expenseServices.initExpenses();

  return app;
}

module.exports = {
  createServer,
};
