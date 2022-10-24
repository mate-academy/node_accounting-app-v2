'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  initUsers,
} = require('./services/users');

function usersRoutes(app) {
  router.use(cors());
  app.use('/users', router);
  initUsers();

  router.post('/', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = createUser(name);

    res.statusCode = 201;
    res.send(newUser);
  });

  router.get('/', (req, res) => {
    const users = getAll();

    res.send(users);
    res.statusCode = 200;
  });

  router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus = 200;
    res.send(foundUser);
  });

  router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    removeUser(userId);
    res.sendStatus(204);
  });

  router.patch('/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    };

    const { name } = req.body;

    updateUser({
      userId, name,
    });
    res.send(foundUser);
  });
}

module.exports = { usersRoutes };
