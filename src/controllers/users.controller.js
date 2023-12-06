'use strict';

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUsers,
} = require('../servises/users.servise');

const getAllResponse = (req, res) => {
  const users = getAllUsers();

  res.send(users);
};

const getUserResponse = (req, res) => {
  const { id } = req.params;
  const user = getUserById(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const createUserResponse = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const newUser = createUser(name);

  return res.status(201).send(newUser);
};

const deleteUserResponse = (req, res) => {
  const { id } = req.params;

  if (!getUserById(id)) {
    return res.sendStatus(404);
  }

  deleteUser(+id);

  return res.sendStatus(204);
};

const updateUserResponse = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const foundUser = getUserById(+id);

  if (foundUser) {
    const updatedUser = updateUsers(+id, name);

    return res.send(updatedUser);
  } else {
    return res.sendStatus(404);
  }
};

module.exports = {
  getAllResponse,
  getUserResponse,
  createUserResponse,
  deleteUserResponse,
  updateUserResponse,
};
