'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users.js');

function createServer() {
  const app = express();

  app.use(bodyParser.json());

  app.use('/users', usersRoutes);

  app.get('/', (req, res) => {
    res.send('Hello from Homepage');
  });

  app.listen(2500, () => {
    console.log(`http://localhost:2500`);
  });

  return app;
}

createServer();

module.exports = {
  createServer,
};
