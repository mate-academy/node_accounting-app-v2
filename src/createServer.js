'use strict';

const express = require('express');
const cors = require('cors');
const { router: expenseRouter } = require('./routes/expenses.js');
const { router: userRouter } = require('./routes/users.js');
const usersServise = require('./servises/users.js');
const expensesServise = require('./servises/expenses.js');

function createServer() {
  const app = express();

  usersServise.deleteAll();
  expensesServise.deleteAll();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
