'use strict';

const { createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser } = require('../services/userService');

const getAllUsr = (req, res) => {
  const users = getAllUsers();

  res.send(users);
};

const getUsrById = (req, res) => {
  const { userID } = req.params;
  const user = getUserById(userID);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const createUsr = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send('Name is required');

    return;
  }

  const user = createUser(name);

  res.status(201);
  res.send(user);
};

const deleteUsr = (req, res) => {
  const { userID } = req.params;
  const deleted = deleteUser(userID);

  if (!deleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateUsr = (req, res) => {
  const { userID } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send('Name is required');

    return;
  }

  const updatedUser = updateUser(userID, name);

  if (!updatedUser) {
    res.status(404);
    res.send('User not found');

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  deleteUsr,
  createUsr,
  getUsrById,
  getAllUsr,
  updateUsr,
};
