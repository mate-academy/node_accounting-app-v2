'use strict';

const express = require('express');

function usersRouter(router, initialUsers) {
  let users = initialUsers;

  router.get('/', (req, res) => {
    res.send(users);
  });

  router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  router.post('/', express.json(), (req, res) => {
    const { name } = req.body;
    const newId = users.length ? users[users.length - 1].id + 1 : 1;

    const newUser = {
      id: newId,
      name,
    };

    if (!name) {
      res.sendStatus(400);

      return;
    }

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  router.delete('/:userId', (req, res) => {
    const { userId } = req.params;

    const filteredUsers = [...users].filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  router.patch('/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(422);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });
};

module.exports = { usersRouter };
