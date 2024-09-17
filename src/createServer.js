'use strict';

const express = require('express');

const { router: userRouter } = require('./users/router-users.js');
const { router: ExpenseRouter } = require('./expense/router-expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(userRouter);
  app.use(ExpenseRouter);

  return app;
}

module.exports = {
  createServer,
};
