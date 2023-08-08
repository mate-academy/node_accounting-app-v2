'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./routes/usersRouter.js');
const { expensesRouter } = require('./routes/expensesRouter.js');
const { init: usersInit } = require('./services/userServices.js');
const { init: expensesInit } = require('./services/expenseServices.js');

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
