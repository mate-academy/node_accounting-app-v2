'use strict';

const {
  getAllUsers,
  getByUserId,
  createNewUser,
  removeUser,
  updateUser,
} = require('../services/users');

const getAll = (req, res) => {
  const user = getAllUsers();

  res.send(user);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = getByUserId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = getByUserId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  removeUser(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = getByUserId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(404);

    return;
  }

  updateUser({
    id: userId, name,
  });
  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
