'use strict';

const { UserServices } = require('../services/users.service');

const getUsers = (req, res) => {
  const users = UserServices.getUsers();

  if (!users) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(users);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = UserServices.findUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = UserServices.createUser(name);

  res.status(201);
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const user = UserServices.findUser(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  UserServices.deleteUser(+id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = UserServices.findUser(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  UserServices.updateUser(user, name);

  res.send(user);
};

const UserController = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = {
  UserController,
};
