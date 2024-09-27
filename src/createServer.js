'use strict';

const express = require('express');
const storageService = require('./service/storage.service');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');

function createServer() {
  const app = express();

  storageService.initializeStorage();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
