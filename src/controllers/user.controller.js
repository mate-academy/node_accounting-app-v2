/* eslint-disable no-console */
/* eslint-disable no-useless-return */
'use strict';

const userService = require('../services/users.service');

const get = (req, res) => {
  const allUsers = userService.getAllUsers();

  res.send(allUsers);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getUsersById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const user = userService.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUsersById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  if (typeof name !== 'string') {
    return res.sendStatus(422);
  }

  const updatedUser = userService.updateUser({
    id, name,
  });

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const user = userService.getUsersById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  userService.removeUser(id);

  return res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
