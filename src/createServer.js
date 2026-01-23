'use strict';

const http = require('http');
const { DB } = require('./db/createDB');
const { validateRequest } = require('./validation/validateRequest');
const { readBody } = require('./helpers/helpers');
const { bodySchemas } = require('./static/constants');
const { validateBody } = require('./validation/validateBody');

function createServer() {
  // create instance of DB
  const db = new DB();

  return http.createServer(async (req, res) => {
    // validate request
    const parsedRequest = validateRequest(req);

    if (!parsedRequest.ok) {
      res.statusCode = parsedRequest.statusCode;
      res.end(parsedRequest.message);

      return;
    }

    // get entity, id from path
    const { method, ent, id } = parsedRequest;
    let body = null;

    // check if method has body
    if (bodySchemas[ent][method]) {
      try {
        // parse body && JSON in body
        body = await readBody(req);

        // validate body by schema
        const validated = validateBody(body, ent, method);

        if (!validated.ok) {
          res.statusCode = validated.statusCode;
          res.end(validated.message);
        }
      } catch (e) {
        res.statusCode = 400;
        res.end(e.message);
      }
    }

    // TODO: Add handlers logic
  });
}

module.exports = {
  createServer,
};
