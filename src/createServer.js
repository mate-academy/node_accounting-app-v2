/* eslint-disable max-len */
'use strict';

const express = require('express');
const cors = require('cors');
// const uuidv4 = require('uuidv4').v4;
const { usersRoute } = require('./users/users.route/users.route');

const app = express();

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRoute);

  return app;
}

module.exports = {
  createServer,
};
