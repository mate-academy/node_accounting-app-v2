'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/users.route');
const { expenseRouter } = require('./routes/expense.route');
const { clearService } = require('./services/expenses.service');
const { clearUsers } = require('./services/user.service');

function createServer() {
  clearService();
  clearUsers();

  const app = express();

  app.use(cors());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
