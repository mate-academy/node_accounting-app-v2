'use strict';

const express = require('express');
const { userRouter } = require('./routes/users');
const userService = require('./services/users');

function createServer() {
  const app = express();

  userService.setInitialUsers();

  app.use('/users', userRouter);

  return app;
};

module.exports = {
  createServer,
};
