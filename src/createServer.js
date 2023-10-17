'use strict';

const cors = require('cors');
const userRouter = require('./users/routes/user.route.js');
const expnseRouter = require('./expenses/routes/expense.route.js');

const express = require('express');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expnseRouter);

  return app;
}

module.exports = {
  createServer,
};
