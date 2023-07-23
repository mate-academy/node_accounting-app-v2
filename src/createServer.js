'use strict';

const express = require('express');
const { router: usersRouter } = require('./routers/users');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  app.use('/', express.json(), usersRouter);

  return app;
}

createServer();

module.exports = {
  createServer,
};
