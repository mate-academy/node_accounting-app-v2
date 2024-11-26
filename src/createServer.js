'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter, expensesRouter } = require('./routers');
const { usersService, expensesService } = require('./services');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  usersService.reset();
  expensesService.reset();

  return app;
}

module.exports = {
  createServer,
};
