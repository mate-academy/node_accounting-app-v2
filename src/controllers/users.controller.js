'use strict';

const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  editUser,
} = require('../services/users.service.js');

function getAllUsers(req, res) {
  res.status(200).send(getUsers());
};

function createNewUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(createUser(name));
};

function getUserById(req, res) {
  const { id } = req.params;

  const user = getUser(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

function deleteUserById(req, res) {
  const { id } = req.params;

  const result = deleteUser(+id);

  if (!result) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

function editUserField(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const result = editUser(+id, name);

  if (!result) {
    res.sendStatus(400);

    return;
  }

  res.status(200).send(result);
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  editUserField,
};
