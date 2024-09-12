'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const { usersRouter, initUsers } = require('./routes/users.js');
  const { expensesRouter, initExpenses } = require('./routes/expenses.js');

  const app = express();

  app.use(express.json(), cors());

  app.use('/users', usersRouter);

  app.use('/expenses', expensesRouter);

  initUsers();
  initExpenses();

  return app;
}

module.exports = {
  createServer,
};
