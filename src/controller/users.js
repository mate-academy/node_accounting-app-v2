'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const findOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  };

  const newUser = userService.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const patchOne = (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  const foundUser = userService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const newUser = userService.patchUser(foundUser, name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUserById(Number(userId));

  res.sendStatus(204);
};

module.exports = {
  getAll, findOne, addOne, deleteOne, patchOne,
};
