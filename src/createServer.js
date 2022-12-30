'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());

  return app;
};

module.exports = {
  createServer,
};
