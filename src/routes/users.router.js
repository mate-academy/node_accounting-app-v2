const express = require('express');
const { Router } = express;

const {
  getAllUsers,
  getUser,
  addUser,
  removeUser,
  changeUser,
} = require('../services/users.service');

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  const users = getAllUsers();

  res.send(users);
});

usersRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const user = getUser(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
});

usersRouter.post('/', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = addUser(name);

  res.status(201).send(user);
});

usersRouter.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const isUserRemoved = removeUser(userId);

  if (isUserRemoved) {
    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
});

usersRouter.patch('/:userId', express.json(), (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const user = changeUser(userId, body);

  if (user === -1) {
    res.sendStatus(404);

    return;
  }

  if (Object.keys(body).length === 0) {
    res.sendStatus(400);

    return;
  }

  res.status(200).send(user);
});

module.exports = {
  usersRouter,
};
