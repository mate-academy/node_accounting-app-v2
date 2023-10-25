'use strict';

const { usersService }
  = require('../services/users.service');

const getAllUsers = (req, res) => {
  res.send(usersService.getUsers());
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const sendUser = usersService.getUser(id);

  if (!sendUser) {
    res.sendStatus(404);

    return;
  }

  res.send(sendUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  const uniqueId = Date.now() + Math.floor(Math.random() * 1000);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = {
    id: uniqueId,
    name,
  };

  usersService.addUser(user);
  res.statusCode = 201;

  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = usersService.userIndex(id);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }
  usersService.deleteOneUser(index);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;

  const { name } = req.body;
  const index = usersService.userIndex(id);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  res.status(200);

  res.send(usersService.updateUserName(index, name));
};

const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = {
  usersController,
};
