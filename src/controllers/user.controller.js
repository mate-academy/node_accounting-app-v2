'use strict';

const { userService } = require('../services/user.service');

const getAll = (_, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const userToRemove = userService.getById(Number(userId));

  if (!userToRemove) {
    res.sendStatus(404);

    return;
  }

  userService.remove(Number(userId));

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || !userId) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = userService.getById(Number(userId));

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update(Number(userId), name);

  res.send(updatedUser);
};

const userController = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  userController,
};
