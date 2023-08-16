'use strict';

const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const { router: expensesRouter } = require('./routes/expenses');
const { router: usersRouter } = require('./routes/users');
const userService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  userService.deleteAllUsers();
  expensesService.deleteAllExpenses();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.use((req, res, next) => {
    next(createError(404, 'Page not found'));
  });

  app.use((err, req, res, next) => {
    const { status = 500, message = 'Internal Server Error' } = err;

    res.status(status).send(message);
  });

  return app;
}

module.exports = {
  createServer,
};
