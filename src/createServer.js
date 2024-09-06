'use strict';

const cors = require('cors');
const express = require('express');
const { router: expenseRouter } = require('./routes/expense.router');
const { router: userRouter } = require('./routes/user.router');
const expenseService = require('./services/expense.services');
const userService = require('./services/user.services');

function createServer() {
  const app = express();

  userService.reset();
  expenseService.reset();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    res.status(500).send('Something went wrong but we are working on it!');
  });

  return app;
}

module.exports = {
  createServer,
};
