'use strict';

const usersService = require('../services/users');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addNewUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.addNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUserById = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  usersService.deleteUserById(Number(userId));
  res.sendStatus(204);
};

const updateUserById = (req, res) => {
  const { userId } = req.params;
  const userToUpdate = usersService.getUserById(Number(userId));

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersService.updateUserById(Number(userId), name);

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  deleteUserById,
  updateUserById,
};
