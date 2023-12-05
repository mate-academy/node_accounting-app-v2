'use strict';

const usersService = require('../services/users.service');

const getAllUsers = (req, res) => {
  res.send(usersService.getAllUsers());
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const user = usersService.getUserById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(usersService.createUser(name));
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!usersService.getUserById(+id)) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(+id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!usersService.getUserById(+id)) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const userUpdate = usersService.updateUser({
    id: +id, name,
  });

  if (userUpdate.errorCode) {
    res.sendStatus(userUpdate.errorCode);

    return;
  }

  res.send(userUpdate);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
