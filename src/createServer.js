'use strict';

const express = require('express');
const { usersRouter } = require('./routers/userRouters');
const { expensesRouter } = require('./routers/expensesRouters');
const { cleanUsersArray } = require('./controllers/userControllers');
const { cleanExpensesArray } = require('./controllers/expensesControllers');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);

  app.use('/expenses', express.json(), expensesRouter);

  cleanExpensesArray();
  cleanUsersArray();

  return app;
};

module.exports = {
  createServer,
};
