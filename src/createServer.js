'use strict';

const http = require('http');
const { createDB } = require('./db/createDB');
const { validateURL } = require('./validation/validateURL');

function createServer() {
  const { users, expenses } = createDB();

  return http.createServer((req, res) => {
    const val = validateURL(req);

    if (!val.ok) {
      res.statusCode = val.statusCode;
      res.end(val.message);
    }
  });
}

module.exports = {
  createServer,
};
