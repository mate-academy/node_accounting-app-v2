/* eslint-disable no-console */
'use strict';

const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const expensesRoutes = require('./routes/expensesRoutes');

function createServer() {
  const app = express();

  app.use('/', express.json(), usersRoutes);
  app.use('/', express.json(), expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
