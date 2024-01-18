'use strict';

const userService = require('../services/user.service');

const getAll = (req, res) => {
  return res.status(200).send(userService.getUsers());
};

const getOne = (req, res) => {
  const user = userService.getById(+req.params.id);

  if (!user) {
    res.status(404).send('user not found');

    return;
  }

  return res.status(200).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(404);

    return;
  }

  return res.status(201).send(userService.createUser(name));
};

const update = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(404);

    return;
  }

  return res.status(204).send(userService.updateUser(+req.params.id, name));
};

const remove = (req, res) => {
  if (!userService.getById(+req.params.id)) {
    res.status(404);

    return;
  }

  userService.deleteUser(+req.params.id);

  return res.status(204).send('delete');
};

module.exports = {
  remove,
  update,
  create,
  getOne,
  getAll,
};
