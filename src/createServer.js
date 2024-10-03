'use strict';
// Use express to create a server
// Add a routes to the server
// Return the server (express app)

const express = require('express');
const { data } = require('./data');
const { usersRouter } = require('./users.router');
const { expensesRouter } = require('./expenses.router');

function createServer() {
  const app = express();

  data.users = [];
  data.expenses = [];

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
