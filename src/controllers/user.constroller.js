'use strict';

const {
  getAllUsers, getUserById, createUser, deletUser, editNameOfUser,
} = require('../services/users.services');

const getAll = (req, res) => {
  const users = getAllUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = getUserById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.status(201);
  res.send(createUser(name));
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const isUserExist = getUserById(+id);

  if (!isUserExist) {
    res.sendStatus(404);

    return;
  }

  deletUser(+id);
  res.sendStatus(204);
};

const editUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userToUpdate = getUserById(+id);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const editedUser = editNameOfUser(userToUpdate, name);

  res.send(editedUser);
};

module.exports = {
  getAll,
  getOne,
  addUser,
  deleteUser,
  editUser,
};
