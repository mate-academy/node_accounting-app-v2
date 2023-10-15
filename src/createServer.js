'use strict';

const cors = require('cors');
const userRouter = require('./users/routes/user.route.js');

const express = require('express');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  return app;
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
}

module.exports = {
  createServer,
};
