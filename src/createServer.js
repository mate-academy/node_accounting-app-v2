'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routers/user.router.js');
const { expenseRouter } = require('./routers/expense.router.js');
const { initUsers } = require('./services/users.service.js');
const { initExpenses } = require('./services/expenses.service.js');

function createServer() {
  const app = express();

  initUsers();
  initExpenses();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
