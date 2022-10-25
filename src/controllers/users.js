'use strict';

const userService = require('../services/users');

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(userService.createUsersId(name));
};

const getUsers = (req, res) => {
  res.statusCode = 200;
  res.send(userService.getUsers());
};

const getUserID = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUsersId(userId);

  if (!foundUser || !userId) {
    res.sendStatus(404);

    return;
  }
  res.statusCode = 200;
  res.send(foundUser);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userService.getUsersId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(userService.updateUsersId(userId, name));
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userService.getUsersId(userId)) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
};

module.exports = {
  createUser,
  getUsers,
  getUserID,
  updateUser,
  deleteUser,
};
