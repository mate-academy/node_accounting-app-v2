'use strict';

const {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  changeUser,
} = require('../services/users');

const getUsers = (req, res) => {
  res.send(getAllUsers());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(addUser(name));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  const foundedUser = getUserById(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;

  const foundedUser = getUserById(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  deleteUser(+userId);
  res.sendStatus(204);
};

const modifyUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  let user = getUserById(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  user = changeUser(+userId, name);

  res.send(user);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  removeUser,
  modifyUser,
};
