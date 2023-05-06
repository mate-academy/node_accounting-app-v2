'use strict';

const { userService } = require('../services/usersService.js');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const isUserRemoved = userService.removeUser(+userId);

  if (!isUserRemoved) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.updateUser(+userId, name);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
