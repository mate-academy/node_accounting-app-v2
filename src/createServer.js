'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users.js');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);

  let expense = [];

  // server.get('/expense', express.json(), );

  return app;
}

module.exports = {
  createServer,
};
