'use strict';

const express = require('express');
// const cors = require('cors');

function createServer() {
  const app = express();
  // Add a routes to the server

  // app.use(cors());

  return app;
}

module.exports = {
  createServer,
};
