/* eslint-disable no-console */
'use strict';

const express = require('express');
const { userRouter } = require('./routers/user.router');
// const { expensesRouter } = require('./routers/expenses.router');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/', (request, response) => {
    response.send('Hello');
  });

  app.use('/users', userRouter);
  // app.use('/router', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
