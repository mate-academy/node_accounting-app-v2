const express = require('express');
const expenseRouter = require('./services/expenses.service').router;
const userRouter = require('./services/users.service').router;
const { initExpenses } = require('./services/expenses.service');
const { initUsers } = require('./services/users.service');

function createServer() {
  const app = express();

  app.use(express.json());
  initExpenses();
  initUsers();
  app.use('/expenses', expenseRouter);
  app.use('/users', userRouter);

  return app;
}

module.exports = { createServer };
