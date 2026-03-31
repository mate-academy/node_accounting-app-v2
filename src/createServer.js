'use strict';

const express = require('express');
const cors = require('cors');

const { expensesRoute } = require('./routers/expenses.router.js');
const { usersRoute } = require('./routers/users.router.js');

const { setInitExpanses } = require('./services/expenses.service.js');
const { setInitUsers } = require('./services/users.service.js');

function createServer() {
  setInitExpanses();
  setInitUsers();

  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use('/expenses', expensesRoute);
  app.use('/users', usersRoute);

  return app;
}

module.exports = {
  createServer,
};
