'use strict';

const express = require('express');
const { UserRouter } = require('./routers/UserRouter');
const { ExpenseRouter } = require('./routers/ExpenseRouter');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', UserRouter);
  app.use('/expenses', ExpenseRouter);

  return app;
}

module.exports = {
  createServer,
};
