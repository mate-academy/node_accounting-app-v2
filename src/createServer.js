'use strict';

const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/user.router');
const expensesRouter = require('./routes/expense.router');
const userService = require('./services/user.service.js');
const expensesService = require('./services/expense.service.js');

function createServer() {
  const app = express();

  app.use(cors());
  userService.start();
  expensesService.start();

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
