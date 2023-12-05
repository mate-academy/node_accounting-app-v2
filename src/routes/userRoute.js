'use strict';

const express = require('express');
const userService = require('../services/userService');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.statusCode = 200;
  res.send(userService.getAll());
});

userRouter.post('/', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
});

userRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
});

userRouter.patch('/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !id) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(Number(id))) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update(Number(id), name);

  res.send(updatedUser);
});

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!userService.getById(Number(id))) {
    res.sendStatus(404);

    return;
  }

  userService.remove(Number(id));
  res.sendStatus(204);
});

module.exports = userRouter;
