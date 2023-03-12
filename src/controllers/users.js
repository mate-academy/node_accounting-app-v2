'use strict';

const { userServices } = require('../services/usersServices');

const getAll = (req, res) => {
  const users = userServices.getAllUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const userId = +req.params.userId;

  if (isNaN(userId)) {
    res.sendStatus(404);

    return;
  }

  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.addNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const userId = +req.params.userId;

  const filteredUsers = userServices.deleteUser(userId);

  if (!filteredUsers) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const userId = +req.params.userId;
  const { name } = req.body;

  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.updateUser(userId, name);

  res.send(foundUser);
};

module.exports = {
  usersControllers: {
    getAll,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
  },
};
