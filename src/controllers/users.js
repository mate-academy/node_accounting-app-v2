'use strict';

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} = require('../services/users.service');

const getAll = (req, res) => {
  const users = getAllUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundUser = getUserById(parseInt(id));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
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
  const { id } = req.params;

  if (!getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  deleteUser(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const foundUser = getUserById(parseInt(id));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  updateUser({
    id: parseInt(id),
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
