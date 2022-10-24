'use strict';

const {
  getUserById,
  createUser,
  removeUser,
  updateUser,
} = require('../services/users.js');

let users = [];

const cleanUsersArray = () => {
  users = [];
};

const allUsers = () => {
  return users;
};

const getAllUsers = (req, res) => {
  res.statusCode = 200;

  res.send(users);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(userId, users);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createUser(name, users);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(+userId, users);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  users = removeUser(userId, users);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = getUserById(userId, users);

  if (!foundUser) {
    res.statusCode = 404;

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  updateUser(
    userId,
    name,
    users,
  );

  res.send(foundUser);
};

module.exports = {
  cleanUsersArray,
  allUsers,
  getAllUsers,
  getOneUser,
  addUser,
  remove,
  update,
};
