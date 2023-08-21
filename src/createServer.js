'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/routesUsers.js');
const { expenseRouter } = require('./routes/routesExpenses.js');
const userService = require('./services/servicesUsers.js');
const expensesService = require('./services/servicesExpenses.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  expensesService.deleteAll();
  userService.deleteAll();

  return app;
}

module.exports = {
  createServer,
};
