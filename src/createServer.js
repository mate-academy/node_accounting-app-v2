'use strict';

const express = require('express');

let users = [];
// const expenses = [];

function createServer() {
  users = [];

  const app = express();

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).end();

      return;
    }

    const user = {
      id: +(new Date()),
      name,
    };

    users.push(user);
    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (Number.isNaN(+id)) {
      res.status(400).end();

      return;
    }

    const getById = () => {
      return users.find(oneUser => oneUser.id === +id);
    };

    const user = getById();

    if (!user) {
      res.status(404).end();

      return;
    }

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const filteredUsers = users.filter(user => +user.id !== +id);

    if (users.length === filteredUsers.length) {
      res.status(404).end();

      return;
    }

    users.length = 0;
    users.push(...filteredUsers);

    res.status(204).end();
  });

  app.patch('users/:id', express.json(), (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    // eslint-disable-next-line no-console
    console.log('hello ');

    const user = users.find(oneUser => oneUser.id === +id);

    if (!user) {
      res.status(404).end();

      return;
    }

    if (!name) {
      res.status(400).end();

      return;
    }

    Object.assign(user, { name });

    // userForUpdate.name = name;
    res.statusCode = 200;
    res.send(user);

    // res.status(200).json(userForUpdate);
  });

  return app;
}

module.exports = {
  createServer,
};
