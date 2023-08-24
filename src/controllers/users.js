'use strict';

const {
  getAll,
  getUserById,
  create,
  remove,
  update,
} = require('../services/users');

const getAllUsers = (req, res) => {
  const users = getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(userId);

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

  const newUser = create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  remove(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  update({
    id: userId, name,
  });

  res.statusCode = 200;

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getOne,
  addUser,
  removeUser,
  updateUser,
  getUserById,
};
