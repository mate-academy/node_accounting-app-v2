'use strict';

const userService = require('../services/userService');

const getUsers = (req, res) => res.send(userService.getUsers());

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Name is required!');

    return;
  }

  return res
    .status(201)
    .send(userService.createUser(name));
};

const getUser = (req, res) => {
  const userId = +req.params.id;
  const user = userService.getUserById(userId);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.status(200).json(user);
};

const updateUser = (req, res) => {
  const userId = +req.params.id;
  const propertiesToUpdate = req.body;

  const user = userService.getUserById(userId);

  if (!user) {
    res.status(404).send('User Not Found');

    return;
  }

  const updatedUser = userService.updateUser(user, propertiesToUpdate);

  res.status(200).send(updatedUser);
};

const deleteUser = (req, res) => {
  const userId = +req.params.id;
  const user = userService.getUserById(userId);

  if (!user) {
    res.status(404).send('User Not Found');

    return;
  }

  userService.deleteUser(userId);
  res.status(204).send('Successfully deleted');
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
