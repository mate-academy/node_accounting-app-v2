'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { myStore } = require('../Data/Store');

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.get('/', (req, res) => {
  res.status(200).send(myStore.getAllUsers());
});

usersRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;

  if (myStore.getUser(userId) === undefined) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(myStore.getUser(userId));
});

usersRouter.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const deleteUser = myStore.getUser(userId);

  if (deleteUser === undefined) {
    res.sendStatus(404);

    return;
  }

  myStore.deleteUser(userId);
  res.sendStatus(204);
});

usersRouter.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(myStore.createUser(name));
});

usersRouter.patch('/:userId', (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  const user = myStore.getUser(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(myStore.patchUser(userId, name));
});

module.exports = {
  usersRouter,
};
