'use strict';

const express = require('express');
const cors = require('cors');
const { clearUsers } = require('./services/user.service');
const { clearExpenses } = require('./services/expenses.service');
const { userRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expenses.route');

const app = express();

const createServer = () => {
  clearUsers();
  clearExpenses();

  app.use(cors(), express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
