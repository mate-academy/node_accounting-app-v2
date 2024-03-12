'use strict';

const {
  getUsers,
  createUser,
  getById,
  deleteUser,
  updateUser,
} = require('../services/user.service');

const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  const user = getUsers();

  res.send(user);
});

userRouter.post('/', (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);

    return;
  }

  const user = createUser(req.body.name);

  res.status(201);
  res.send(user);
});

userRouter.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);

    return;
  }

  const user = getById(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
});

userRouter.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);

    return;
  }

  const user = deleteUser(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
});

userRouter.patch('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);

    return;
  }

  const user = getById(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const newUser = updateUser(req.params.id, req.body.name);

  res.send(newUser);
});

module.exports = {
  userRouter,
};
