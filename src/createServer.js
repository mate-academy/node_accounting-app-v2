'use strict';

const express = require('express');
const userService = require('./services/user.service')
const { userRouter } = require('./routers/users');

function createServer() {
  const app = express();

  userService.setInitialUsers();

  app.use('/users', userRouter);

  return app;
}

module.exports = {
  createServer,
};
