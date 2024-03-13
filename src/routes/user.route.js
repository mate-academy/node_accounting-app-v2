'use strict';

const {
  getUsers,
  createUser,
  getById,
  deleteUser,
  updateUser,
} = require('../services/user.service');

const express = require('express');
const { BAD_REQUEST, NOT_FOUND, CREATED, NO_CONTENT } = require('../variables');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  const user = getUsers();

  res.send(user);
});

userRouter.post('/', (req, res) => {
  if (!req.body.name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = createUser(req.body.name);

  res.status(CREATED);
  res.send(user);
});

userRouter.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = getById(req.params.id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(user);
});

userRouter.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = deleteUser(req.params.id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.sendStatus(NO_CONTENT);
});

userRouter.patch('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = getById(req.params.id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const newUser = updateUser(req.params.id, req.body.name);

  res.send(newUser);
});

module.exports = {
  userRouter,
};
