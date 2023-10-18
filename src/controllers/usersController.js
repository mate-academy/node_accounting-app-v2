'use strict';

const usersService = require('../services/usersServices');

beforeEach(() => {
  usersService.deleteAllUsers();
});

const getUsers = (req, res) => {
  res.send(usersService.getUsers());
};

const getUser = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUser(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(usersService.createUser(name));
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!usersService.getUser(+id)) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(+id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!usersService.getUser(+id)) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersService.updateUser(+id, name);

  res.send(updatedUser);

  return updatedUser;
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
