'use strict';

const {
  takeUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
} = require('../services/users.js');

const getAllUsers = (req, res) => {
  const users = takeUsers();

  res.statusCode = 200;
  res.send(users);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(userId);

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

  const newUser = createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  try {
    removeUser(userId);
  } catch (error) {
    res.sendStatus(400);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.statusCode = 404;

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  try {
    updateUser(
      userId,
      name,
    );
  } catch (error) {
    res.sendStatus(400);

    return;
  }

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  remove,
  update,
};
