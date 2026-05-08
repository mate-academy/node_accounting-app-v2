'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users.routes');
const expensesRouter = require('./routes/expenses.routes');
const { resetData } = require('./utils/resetData');

function createServer() {
  resetData();

  const app = express();

  app.use(
    cors({
      origin: '*',
      methods: 'GET, POST, PUT, DELETE',
      allowedHeaders: 'Content-Type',
      credentials: true,
    }),
    express.json(),
  );

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = { createServer };
