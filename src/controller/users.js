'use strict';

const { usersService } = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.updateUser(foundUser.id, name);

  res.send(foundUser);
};

module.exports = {
  getAll,
  getUser,
  postUser,
  deleteUser,
  updateUser,
};
