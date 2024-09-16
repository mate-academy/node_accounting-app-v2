'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/userRoutes.js');
const { router: expenseRouter } = require('./routes/expensesRoutes.js');
const userService = require('./services/userServices.js');
const expenseService = require('./services/expensesServices.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  userService.initUsers();

  app.use('/expenses', express.json(), expenseRouter);
  expenseService.initExpense();

  return app;
}

module.exports = {
  createServer,
};
