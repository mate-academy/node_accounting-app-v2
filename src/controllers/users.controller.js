'use strict';

const userService = require('../services/users.service');
const { instanceNotFound } = require('../utils/instanceNotFound');
const { invalidRequestData } = require('../utils/invalidRequestData');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    return instanceNotFound(res, 'User');
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return invalidRequestData(res, 'name');
  }

  const newUser = userService.create(name);

  return res.status(201).json(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    return instanceNotFound(res, 'User');
  }

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!name || typeof name !== 'string') {
    return invalidRequestData(res, 'name');
  }

  if (!user) {
    return instanceNotFound(res, 'User');
  }

  userService.update(id, name);

  res.send(user);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
