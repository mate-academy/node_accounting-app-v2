'use strict';

const usersServices = require('../services/users.js');

const getAllUsers = (req, res) => {
  const users = usersServices.getAll();

  res.send(users);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const userById = usersServices.getUserById(userId);

  if (!userById) {
    res.status(404).send('User not found');

    return;
  }

  res.send(userById);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(422).send('Name is required');

    return;
  }

  const newUser = usersServices.createUser(name);

  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const userById = usersServices.getUserById(userId);

  if (!userById) {
    res.status(404).send('User not found');

    return;
  }

  usersServices.deleteUser(userId);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const requestedUser = usersServices.getUserById(userId);

  if (!requestedUser) {
    res.status(404).send('User not found');

    return;
  }

  const { name } = req.body;

  if (name !== undefined) {
    if (typeof name !== 'string') {
      res.status(400).send('Name must be a string');

      return;
    }
    requestedUser.name = name;
  }

  res.send(requestedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
};
