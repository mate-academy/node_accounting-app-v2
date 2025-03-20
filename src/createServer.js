'use strict';

const express = require('express');
const cors = require('cors');
const { usersRoute } = require('./routers/usersRoute.js');
const { initUsers } = require('./services/users.services.js');
const { initExpenses } = require('./services/expenses.services.js');
const { expensesRoute } = require('./routers/expensesRoute.js');

function createServer() {
  const app = express();

  initUsers();
  initExpenses();

  app.use(cors());

  app.options('*', cors(), (req, res) => {
    res.send();
  });

  app.use(express.json());
  app.use('/users', usersRoute);
  app.use('/expenses', expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
