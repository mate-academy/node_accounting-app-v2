'use strict';

const { STATUS_MESSAGES } = require('../utils/constants');
const usersService = require('../services/users.service');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(users);
};

const getOne = (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const newUser = {
    id: Number(new Date()),
    name,
  };

  const user = usersService.add(newUser);

  res.statusCode = STATUS_MESSAGES.NEW_RESOURCE_CREATED;
  res.send(user);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name || !id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  const updatedUser = usersService.updateById(id, name);

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(updatedUser);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  usersService.remove(id);
  res.sendStatus(STATUS_MESSAGES.ITEM_DELETED);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
