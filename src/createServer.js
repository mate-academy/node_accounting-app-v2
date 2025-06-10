'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenses');
const userRoutes = require('./routes/users');

function createServer() {
  const users = [];
  const expenses = [];

  const app = express();

  app.use(bodyParser.json());

  app.use('/users', userRoutes(users));
  app.use('/expenses', expenseRoutes(users, expenses));

  return app;
}

module.exports = { createServer };
