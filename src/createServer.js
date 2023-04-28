'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users');
const { router: expenseRouter } = require('./routes/expenses');
const { initialize: inizializeUsers } = require('./services/users');
const { initialize: inizializeExpenses } = require('./services/expenses');

const app = express();

app.use(express.json());
app.use('/users', usersRouter);
app.use('/expenses', expenseRouter);

function createServer() {
  inizializeExpenses();
  inizializeUsers();

  return app;
}

module.exports = {
  createServer,
};
