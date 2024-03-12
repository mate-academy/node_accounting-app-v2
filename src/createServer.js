'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const usersService = require('./services/users.service');

function createServer() {
  const app = express();

  usersService.clearUsers();

  app.use('/users', express.json(), usersRouter);

  return app;
}

module.exports = { createServer };
