'use strict';

const express = require('express');
const cors = require('cors');
const userSevises = require('./servises/userServises');
const expensesSevises = require('./servises/expensesServises');
const { router: userRouter } = require('./routes/userRoutes');
const { router: expenseRouter } = require('./routes/expenseRoutes');

function createServer() {
  const app = express();

  userSevises.init();
  expensesSevises.init();
  app.use(cors());
  app.use(userRouter);
  app.use(expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
