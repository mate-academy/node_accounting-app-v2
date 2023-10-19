'use strict';

const userService = require('../services/user.service');
const httpStatusCodes = require('../utils/httpStatusCodes');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const searchedUser = userService.getById(id);

  if (!searchedUser) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  res.send(searchedUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(httpStatusCodes.BAD_REQUEST);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = httpStatusCodes.CREATED;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(httpStatusCodes.UNPROCESSABLE_ENTITY);

    return;
  }

  const updatedUser = userService.update({
    id, name,
  });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  userService.remove(id);
  res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
