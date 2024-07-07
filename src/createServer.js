'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  const app = express();
  // Add a routes to the server
  // Return the server (express app)

  return app;
}

module.exports = {
  createServer,
};
