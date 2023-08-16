'use strict';

const userService = require('../services/users');
const { NotFound, BadRequest } = require('http-errors');

const getAllUsers = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  if (isNaN(userId)) {
    throw new BadRequest('Invalid user id');
  }

  const user = userService.getOne(userId);

  if (!user) {
    throw new NotFound('User not found');
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new BadRequest('Missing required name field');
  }

  const newUser = userService.createOne(name);

  res.status(201).send(newUser);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const errors = [];

  if (isNaN(userId)) {
    errors.push('Invalid user id');
  }

  if (!name) {
    errors.push('Missing required name field');
  }

  if (typeof name !== 'string') {
    errors.push('Name must be a string');
  }

  if (errors.length) {
    throw new BadRequest({ errors });
  }

  if (!userService.getOne(userId)) {
    throw new NotFound('User not found');
  }

  const updatedUser = userService.updateOne(userId, name);

  res.send(updatedUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  if (isNaN(userId)) {
    throw new BadRequest('Invalid user id');
  }

  if (!userService.getOne(userId)) {
    throw new NotFound('User not found');
  }

  userService.deleteOne(userId);

  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
