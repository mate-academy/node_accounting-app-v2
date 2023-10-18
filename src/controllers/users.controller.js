'use strict';

const usersService = require('../services/users.service');
const {
  NOT_FOUND,
  NO_CONTENT,
  UNPROCESSABLE_CONTENT,
  BAD_REQUEST,
  CREATED,
} = require('../constants/statuses.js');

const get = (_, res) => {
  res.send(usersService.getUsers());
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = usersService.createUser(name);

  res.status(CREATED).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  usersService.removeUser(id);
  res.sendStatus(NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getUserById(id);

  if (!name) {
    res.sendStatus(UNPROCESSABLE_CONTENT);
  }

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const newData = usersService.updateUser(user, name);

  res.send(newData);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
