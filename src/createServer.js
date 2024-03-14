'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/userRoute');
const { expensesRouter } = require('./routes/expensesRoute');
const { init: userInit } = require('./services/userService');
const { init: expensesInit } = require('./services/expensesService');

function createServer() {
  userInit();
  expensesInit();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
