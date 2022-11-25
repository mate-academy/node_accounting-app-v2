'use strict';

const express = require('express');
const { expencesRouter } = require('./routes/expences');
const { usersRouter } = require('./routes/users');

function createServer() {
  const app = express();

  app.use('./users', express.json(), usersRouter);
  app.use('./expences', express.json(), expencesRouter);

  return app;
}

module.exports = {
  createServer,
};
