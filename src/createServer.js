'use strict';

const express = require('express');
const cors = require('cors');
const { usersRoutes } = require('./usersRoutes');
const { expencesRoutes } = require('./expensesRoutes');

function createServer() {
  const app = express();

  app.use(cors());
  usersRoutes(app);
  expencesRoutes(app);

  return app;
}

module.exports = {
  createServer,
};
