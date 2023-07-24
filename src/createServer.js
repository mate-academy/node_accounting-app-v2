'use strict';

const express = require('express');

const cors = require('cors');

const {
  usersRouter,
} = require('./routes/usersRouter');

const {
  init: usersInit,
} = require('./services/userServices');

const {
  expensesRouter,
  init: expensesInit,
} = require('./routes/expensesRouter');

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
