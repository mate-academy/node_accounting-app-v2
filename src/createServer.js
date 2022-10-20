'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const userRouts = require('./routes/users.js');

function createServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use('/', userRouts);

  // app.get('/', (req, res) => {
  //   res.send('users');
  // });

  return app;
}

module.exports = { createServer };
