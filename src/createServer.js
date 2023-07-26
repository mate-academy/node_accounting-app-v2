'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/user');

function createServer() {
  const server = express();

  server.use('/users', express.json(), userRouter);

  return server;
}

createServer();

module.exports = {
  createServer,
};
