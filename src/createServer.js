'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.routes');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);

  return app;
}

module.exports = {
  createServer,
};
