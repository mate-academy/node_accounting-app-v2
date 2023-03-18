'use strict';

const express = require('express');
const cors = require('cors');

const expanseServise = require('./services/expenses');
const userServise = require('./services/users');

const { router: usersRouter } = require('./routes/users');
const { router: expanseRouter } = require('./routes/expences');

function createServer() {
  userServise.setDefaultUsers();
  expanseServise.setDefaultExpanses();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expanseRouter);

  return app;
}

module.exports = {
  createServer,
};
