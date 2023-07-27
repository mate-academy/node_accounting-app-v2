'use strict';

const express = require('express');
const setInitialExpenses = require('./routes/expenses.js');
const setInitialUsers = require('./routes/users.js')
const { router: userRouter } = require('./routes/users.js');
const { router: expenseRouter } = require('./routes/expenses.js');

const createServer = () => {
  const app = express();

  setInitialExpenses();
  setInitialUsers();
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

createServer();

module.exports = {
  createServer,
};
