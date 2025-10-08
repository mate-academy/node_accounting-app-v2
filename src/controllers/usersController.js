'use strict';

const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(parseInt(req.params.id, 10));

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.json(user);
};

const createUser = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).send('Name is not passed');
  }

  const user = await userService.createUser(name);

  res.status(201).json(user);
};

const deleteUser = async (req, res) => {
  const deletedUser = await userService.deleteUserById(
    parseInt(req.params.id, 10),
  );

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is not passed');
  }

  const user = await userService.getUserById(parseInt(req.params.id));

  if (!user) {
    return res.status(404).send('User not found');
  }

  const updatedUser = await userService.updateUserById({
    id: parseInt(req.params.id, 10),
    name,
  });

  res.json(updatedUser);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
