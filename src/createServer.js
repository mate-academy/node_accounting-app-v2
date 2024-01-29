'use strict';

const { userRouter } = require('./routes/user.router');

const express = require('express');

function createServer() {
  // Use express to create a server
  const app = express();

  // Add a routes to the server
  app.use('/users', express.json(), userRouter);

  // Return the server (express app)
  return app;
}

module.exports = {
  createServer,
};
