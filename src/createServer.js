'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  const users = [];

  app.get('/users', express.json(), (req, res) => {
    if (!users) {
      res.statusCode = 200;

      res.send([]);

      return;
    }

    res.statusCode = 200;

    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;

      res.send();

      return;
    }

    const user = {
      name,
      id: users.length + 1,
    };

    users.push(user);

    res.statusCode = 201;

    res.send(user);
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      res.statusCode = 404;

      res.send();

      return;
    }

    const userId = Number(id);

    if (Number.isNaN(userId)) {
      res.statusCode = 400;

      res.send();

      return;
    }

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      res.statusCode = 404;

      res.send();

      return;
    }

    const index = users.indexOf(foundUser);

    users.splice(index, 1);

    res.statusCode = 204;

    res.send();
  });

  return app;
}

module.exports = {
  createServer,
};
