'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { addRouting } = require('./routing');

function createServer() {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  return addRouting(server);
}

module.exports = {
  createServer,
};
