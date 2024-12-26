'use strict';

const { UserModel } = require('../models/users');

const getAllUsers = (req, res) => {
  const users = UserModel.getUsers();

  res.send(users);
};

const addNewUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Bad request');

    return;
  }

  const newUser = UserModel.addUser({ name });

  res.statusCode = 201;
  res.send(newUser);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const user = UserModel.getUser(+userId);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.send(user);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  const user = UserModel.removeUser(+userId);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.status(204).send('No Content');
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const updatedUser = UserModel.updateUser({
    id: userId,
    name,
  });

  if (!updatedUser) {
    res.status(404).send('User not found');

    return;
  }

  if (typeof name !== 'string') {
    res.status(400).send('Bad request');

    return;
  }

  res.status(200).send(updatedUser);
};

module.exports = {
  getAllUsers,
  addNewUser,
  getOneUser,
  deleteUser,
  updateUser,
};
