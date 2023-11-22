'use strict';

const {
  getAllUsers,
  addUser,
  getUserById,
  updateUserInfo,
  removeUserById,
} = require('../services/user.servise');

const getUsers = (req, res) => {
  res.statusCode = 200;
  res.send(getAllUsers());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  const findUser = getUserById(id);

  if (!findUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(findUser);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const findUser = getUserById(id);

  if (!findUser) {
    res.sendStatus(404);

    return;
  }

  const newUser = updateUserInfo(findUser, name);

  res.statusCode = 200;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const findUser = getUserById(id);

  if (!findUser) {
    res.sendStatus(404);

    return;
  }

  removeUserById(id);

  res.sendStatus(204);
};

module.exports = {
  getUsers,
  createUser,
  getOneUser,
  updateUser,
  removeUser,
};
