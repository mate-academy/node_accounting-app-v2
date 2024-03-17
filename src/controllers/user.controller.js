'use strict';

const userService = require('../services/user.service');
const { statusCode } = require('../statusCodes');

const get = (req, res) => {
  res.send(userService.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params || undefined;

  const user = userService.getUserById(id);

  if (!user) {
    res.status(statusCode.NOT_FOUND).send();
  } else {
    res.send(user);
  }
};

const create = (req, res) => {
  const { name } = req.body || undefined;

  if (typeof name !== 'string') {
    res.status(statusCode.BAD_REQUEST);
    res.send();

    return;
  }

  const user = userService.createUser(name);

  res.status(statusCode.CREATED);
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params || undefined;
  const { name } = req.body || undefined;

  if (typeof name !== 'string') {
    res.status(statusCode.NOT_FOUND);
    res.send();

    return;
  }

  const changedUser = userService.updateUser(id, name);

  res.send(changedUser);
};

const remove = (req, res) => {
  const { id } = req.params || undefined;

  if (userService.getUserById(id)) {
    userService.deleteUser(id);
    res.status(statusCode.NO_CONTENT).send();
  } else {
    res.status(statusCode.NOT_FOUND).send();
  }
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
