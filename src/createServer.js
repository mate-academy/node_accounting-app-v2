'use strict';

const usersRouter = require('./routes/users.routes.js');
const expensesRouter = require('./routes/expenses.routes.js');

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const users = [];
  const expenses = [];

  app.use('/users', usersRouter(users));
  app.use('/expenses', expensesRouter(users, expenses));

  return app;
}

module.exports = {
  createServer,
};
