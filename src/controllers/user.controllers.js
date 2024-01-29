'use strict';

const userService = require('../services/user.service');

const getAllUser = (req, res) => {
  return res.status(200).send(userService.getUsers());
};

const getOneUser = (req, res) => {
  const user = userService.getById(+req.params.id);

  if (!user) {
    res.status(400).send('user not found');

    return;
  }

  return res.status(200).send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);

    return;
  }

  return res.status(201).send(userService.createUser(name));
};

const updateUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);

    return;
  }

  return res.status(204).send(userService.updateUser(+req.params.id, name));
};

const removeUser = (req, res) => {
  if (!userService.getById(+req.params.id)) {
    res.status(404);

    return;
  }

  userService.deleteUser(+req.params.id);

  return res.status(204).send('delete');
};

module.exports = {
  removeUser,
  updateUser,
  createUser,
  getOneUser,
  getAllUser,
};
