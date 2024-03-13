'use strict';

const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUserById,
  updateUser,
  setAllUsers,
} = require('../services/user.service.js');

function get(req, res) {
  const allUsers = getAllUsers();

  res.send(allUsers);
}

function addUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createNewUser(name);

  res.status(201).send(newUser);
}

function getOneUser(req, res) {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
}

function deleteUser(req, res) {
  const { id } = req.params;
  const newUsers = deleteUserById(id);
  const allUsers = getAllUsers();

  if (allUsers.length === newUsers.length) {
    res.sendStatus(404);

    return;
  }

  setAllUsers(newUsers);
  res.sendStatus(204);
}

function updateOneUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = updateUser(user, name);

  res.send(updatedUser);
}

module.exports = {
  get,
  addUser,
  getOneUser,
  deleteUser,
  updateOneUser,
};
