'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/usersRoutes');
const expensesRouter = require('./routes/expensesRoutes');
const usersService = require('./services/usersService');
const expensesService = require('./services/expensesService');

function createServer() {
  const app = express();

  usersService.clearAll();
  expensesService.clearAll();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = { createServer };
