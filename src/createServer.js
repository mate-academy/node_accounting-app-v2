'use strict';

const express = require('express');
const { expensePoints } = require('./expensePoints');
const { userPoints } = require('./userPoints');

function createServer() {
  const app = express();
  const userRouter = express.Router();
  const expenseRouter = express.Router();

  const users = [];
  const expenses = [];

  // app.use(express.json());
  userPoints(userRouter, { users });
  expensePoints(expenseRouter, { users }, { expenses });

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
