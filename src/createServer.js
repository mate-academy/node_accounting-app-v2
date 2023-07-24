'use strict';

const express = require('express');
const { userRouter } = require('./routers/userRouter');
const { expensesRouter } = require('./routers/expensesRouter');

function createServer() {
  const app = express();

  app.use(userRouter);
  app.use(expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
