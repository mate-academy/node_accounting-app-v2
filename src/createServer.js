'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users.router.js');
const expensesRouter = require('./routes/expenses.router.js');
const { usersService } = require('./services/users.service.js');
const { expensesService } = require('./services/expenses.service.js');

const createServer = () => {
  const app = express();

  usersService.clear(); // clear for test
  expensesService.clear(); // clear for test

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = { createServer };
