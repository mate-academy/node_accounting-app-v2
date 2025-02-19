'use strict';

const express = require('express');

const { usersRoute } = require('./routes/user.route');
const { expenseRoute } = require('./routes/expense.route');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRoute);
  app.use('/expenses', expenseRoute);

  return app;
}

module.exports = {
  createServer,
};
