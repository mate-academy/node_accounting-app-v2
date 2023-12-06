'use strict';

const {
  createUser,
  getUserById,
  getAllUsers,
  deleteUser,
  updateUser,
} = require('../services/users.service');

const get = (req, res) => {
  const users = getAllUsers();

  res.send(users);
};

const postOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = createUser(name);

  res.status(201).send(newUser);
};

const getOneById = (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const deleteOne = (req, res) => {
  const { id } = req.params;
  const deletedUser = deleteUser(id);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  if (typeof name !== 'string') {
    return res.sendStatus(422);
  }

  const updatedUser = updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  postOne,
  getOneById,
  deleteOne,
  updateOne,
};
