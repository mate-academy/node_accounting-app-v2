'use strict';

const express = require('express');
const { Userouter } = require('./routes/users.route');

function createServer() {
  const app = express();

  app.use('/users', express.json(), Userouter);

  return app;
}

module.exports = {
  createServer,
};
