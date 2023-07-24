'use strict';

const express = require('express');
const uuid = require('uuid');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  app.get('/users', (_, response) => {
    response.send(users);
  });

  app.get('/users/:userId', (request, response) => {
    const { userId } = request.params;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      response.statusCode(404);

      return;
    }

    response.statusCode(200);
    response.send(foundUser);
  });

  app.post('/users', express.json(), (request, response) => {
    const { name } = request.body;

    if (!name) {
      response.sendStatus(400);

      return;
    }

    const newUser = {
      id: uuid(),
      name,
    };

    users.push(newUser);

    response.statusCode(201);
    response.send(newUser);
  });
}

module.exports = {
  createServer,
};
