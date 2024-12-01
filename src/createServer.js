'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/user.route.js');
const { router: expenseRouter } = require('./routes/expense.route.js');
const { resetUsers } = require('./services/user.service.js');
const { resetExpenses } = require('./services/expense.service.js');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use(express.json());
  app.use(cors());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
