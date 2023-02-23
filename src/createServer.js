'use strict';

const express = require('express');
const { userRouter } = require('./routes/usersRoute');
const { deleteAllUsers } = require('./services/usersService');

function createServer() {
  const app = express();

  deleteAllUsers();

  app.use('/users', express.json(), userRouter);

  return app;
}

module.exports = {
  createServer,
};
