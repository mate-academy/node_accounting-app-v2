'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');

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
