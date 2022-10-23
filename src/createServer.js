'use strict';

const express = require('express');
const cors = require('cors');
const { initUsersRoutes } = require('./users.service');
const { initExpencesRoutes } = require('./expensess.service');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const userRouter = express.Router();
  const expenseRouter = express.Router();

  const users = [];

  const expenses = [];
  const storage = {
    users,
    expenses,
  };

  initUsersRoutes(userRouter, storage);
  initExpencesRoutes(expenseRouter, storage);

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
