/* eslint-disable function-paren-newline */
'use strict';

const express = require('express');
const { usersRouter } = require('./routes/usersRouter');
const { expensesRouter } = require('./routes/expensesRouter.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
