'use strict';

const express = require('express');
const cors = require('cors');

const { notFound } = require('./middleware/notFound');
const { usersRoute } = require('./routes/users');
const { expensesRoute } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRoute);
  app.use('/expenses', expensesRoute);

  app.use(notFound);

  return app;
}

module.exports = { createServer };
