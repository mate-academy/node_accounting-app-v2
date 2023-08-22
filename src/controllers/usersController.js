'use strict';

const { BadRequest, NotFound } = require('http-errors');
const usersService = require('../services/users');

function getUsers(req, res) {
  const users = usersService.getAll();

  res.send(users);
}

function getUser(req, res) {
  const { userId } = req.params;

  if (isNaN(userId)) {
    throw new BadRequest('Invalid user id');
  }

  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    throw new NotFound('User is not found');
  }

  res.send(foundUser);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    throw new BadRequest('Name is required');
  }

  const newUser = usersService.create(name);

  res.status(201).send(newUser);
}

function updateUser(req, res) {
  const { userId } = req.params;

  if (isNaN(userId)) {
    throw new BadRequest('Invalid user id');
  }

  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    throw new NotFound('User is not found');
  }

  const { name } = req.body;

  if (!name) {
    throw new BadRequest('Name is required');
  }

  if (typeof name !== 'string') {
    throw new BadRequest('Invalid name (must be a string)');
  }

  const updatedUser = usersService.update({
    id: userId,
    name,
  });

  res.send(updatedUser);
}

function deleteUser(req, res) {
  const { userId } = req.params;

  if (isNaN(userId)) {
    throw new BadRequest('Invalid user id');
  }

  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    throw new NotFound('User is not found');
  }

  usersService.remove(userId);
  res.status(204).send();
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
