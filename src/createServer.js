'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/users');
const userService = require('./services/users');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);

  userService.resetUsers();

  return app;
}

module.exports = {
  createServer,
};
