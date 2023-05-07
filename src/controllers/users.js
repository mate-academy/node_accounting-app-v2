'use strict';

const { UserModel } = require('../models/users');

const getAllUsers = (req, res) => {
  const users = UserModel.getUsers();

  res.send(users);
};

const addNewUser = (req, res) => {
  const { name } = req.body;

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

  const usersWithoutRemovedUser = UserModel.removeUser(+userId);

  res.send(usersWithoutRemovedUser);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const user = UserModel.updateUser(userId, name);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  if (typeof title !== 'string') {
    res.status(400).send('Bad request');
  }

  res.setStatus(200);
  res.send(user);
};

const deleteUsers = (req, res) => {
  const { ids } = req.body;

  UserModel.removeUsers(ids);
  res.sendStatus(204);
};

const updateUsers = (req, res) => {
  const { ids } = req.body;

  const updateUsersResult = UserModel.updateUsers(ids);

  res.sendStatus(204);
  res.send(updateUsersResult);
};

module.exports = {
  getAllUsers,
  addNewUser,
  getOneUser,
  deleteUser,
  updateUser,
  deleteUsers,
  updateUsers,
};
