'use strict';

const express = require('express');
const { resetUsers } = require('./services/user.service');
const { userRouter } = require('./routes/user.route');
const { resetExpenses } = require('./services/expense.service');
const { expenseRouter } = require('./routes/expense.route');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  resetUsers();
  resetExpenses();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
