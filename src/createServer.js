'use strict';

const cors = require('cors');
const express = require('express');

const usersServices = require('./services/users');
const expensesServices = require('./services/expenses');
const userRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  usersServices.resetUsers();
  expensesServices.resetExpenses();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
