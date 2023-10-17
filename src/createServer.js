'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./Routes/users.routes');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);

  return app;
}

module.exports = {
  createServer,
};
