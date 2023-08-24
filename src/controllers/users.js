'use strict';

const userService = require('../servises/users');

const getAll = (req, res) => {
  res.statusCode = 200;
  res.send(userService.getAll());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const findUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.findUser(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.findUser(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.findUser(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = {
    ...foundUser,
    name,
  };

  userService.updateUser(updatedUser, userId);

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  getAll,
  findUser,
  createUser,
  deleteUser,
  updateUser,
};
