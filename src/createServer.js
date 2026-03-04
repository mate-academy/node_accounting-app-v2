'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/user.route.js');
const { router: expensesRouter } = require('./routes/expenses.route.js');
const expensesService = require('./services/expenses.service');
const userService = require('./services/user.service');

const createServer = () => {
  expensesService.reset();
  userService.reset();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = { createServer };
