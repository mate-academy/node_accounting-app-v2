'use strict';

const express = require('express');

function createServer() {
  const app = express();
  return app;
}

module.exports = {
  createServer,
};
