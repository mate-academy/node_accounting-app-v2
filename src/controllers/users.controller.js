'use strict';

const userService = require('../services/users.service');

const getAllUsers = (req, res) => {
  const users = userService.getAll();

  res.json(users);
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(+id);

  if (!user) {
    res.statusCode = 404;
    res.statusMessage = 'Error';
    res.end();
  }
  res.json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.statusMessage = 'Error';
    res.end();
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.json(newUser);
  res.end();
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(+id);

  if (!user || !name) {
    res.statusCode = 404;
    res.statusMessage = 'Error';
    res.end();
  }

  const updatedUser = userService.update(id, name);

  res.json(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(+id);

  if (!user) {
    res.statusCode = 404;
    res.statusMessage = 'Error';
    res.end();
  }

  userService.remove(+id);
  res.statusCode = 204;
  res.end();
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
