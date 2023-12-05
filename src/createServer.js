'use strict';

const express = require('express');
const path = require('path');

const users = [];

function createServer() {
  const app = express();

  app.get('/users', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    res.send(users);
  })



  // Use express to create a server
  // Add a routes to the server
  return app;
}

module.exports = {
  createServer,
};
