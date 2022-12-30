'use strict';

const express = require('express');
const cors = require('cors');

const usersRoute = require('./routes/usersRoute');
const expensesRoute = require('./routes/expensesRoute');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(usersRoute);
  app.use(expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
