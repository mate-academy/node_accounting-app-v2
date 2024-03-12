'use strict';

const express = require('express');
const router = require('./routes');
const cors = require('cors');
const { expenses } = require('./services/expenses.service');
const { users } = require('./services/users.service');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/', router);
  expenses.length = 0;
  users.length = 0;

  return app;
}

module.exports = {
  createServer,
};
