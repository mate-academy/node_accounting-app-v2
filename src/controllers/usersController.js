'use strict';

const { userService } = require('../services/userService');

function getUsers(req, res) {
  const users = userService.getAllUsers();

  res.send(users);
};

function getUser(req, res) {
  const { userId } = req.params;

  const foundUser = userService.getUserById(+userId);

  if (!foundUser) {
    res.status(404).send('User does not exist');

    return;
  }

  res.send(foundUser);
};

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Incorrect user name');

    return;
  }

  const newUser = userService.addUser(name);

  res.status(201).send(newUser);
};

function deleteUser(req, res) {
  const { userId } = req.params;

  const foundUser = userService.getUserById(+userId);

  if (!foundUser) {
    res.status(404).send('User does not exist');

    return;
  }

  userService.removeUser(+userId);

  res.status(204).send();
};

function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.status(404).send('User is not found');

    return;
  }

  if (!name) {
    res.status(400).send('No user with this name');
  }

  if (typeof name !== 'string') {
    res.status(422).send('Incorrect name type');

    return;
  }

  const updUser = userService.updateUserInfo(userId, name);

  res.status(200).send(updUser);
};

const userController = {
  getUser, getUsers, createUser, deleteUser, updateUser,
};

module.exports = { userController };
