'use strict';

const { userRouter } = require('./routes/users.router.js');
const { expenseRouter } = require('./routes/expenses.route.js');
const { resetUsers } = require('./services/users.service.js');
const { resetExpenses } = require('./services/expenses.service.js');

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
