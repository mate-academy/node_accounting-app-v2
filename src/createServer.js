'use strict';

const express = require('express');
const cors = require('cors');
const initRoutes = require('./routes/routes');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  userService.reset();
  expenseService.reset();

  initRoutes(app);

  return app;
}

module.exports = {
  createServer,
};
