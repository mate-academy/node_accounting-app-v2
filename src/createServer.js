'use strict';

const express = require('express');
const { createDb } = require('./db');
const { createUsersRouter } = require('./routes/users');
const { createExpensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();
  const db = createDb();

  app.use(express.json());
  app.use('/users', createUsersRouter(db));
  app.use('/expenses', createExpensesRouter(db));

  return app;
}

module.exports = {
  createServer,
};
