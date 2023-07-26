'use strict';

const express = require('express');

const cors = require('cors');

const { usersRouter } = require('./users/usersRouter');

const { init: usersInit } = require('./users/usersServices');

const { expensesRouter } = require('./expenses/expensesRouter');

const { init: expensesInit } = require('./expenses/expensesServices');

function createServer() {
  usersInit();
  expensesInit();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
