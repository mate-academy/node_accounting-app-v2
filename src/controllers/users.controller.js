'use strict';

const usersService = require('../services/users.service');

const get = (req, res) => {
  res.send(usersService.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(id);

  res.sendStatus(204);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.createUser(name);

  res.status(201).send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = usersService.updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
