'use strict';

const STATUS_CODES = require('../constants/statuses');
const usersService = require('./../services/users.service');

const get = (req, res) => {
  res.send(usersService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id || !isFinite(id)) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const user = usersService.getById(+id);

  if (!user) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id || !isFinite(id)) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  if (!usersService.getById(+id)) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  usersService.remove(+id);

  res.sendStatus(STATUS_CODES.NO_CONTENT);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const user = usersService.create(name);

  res.statusCode = STATUS_CODES.CREATED;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !isFinite(id) || !name || typeof name !== 'string') {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  if (!usersService.getById(+id)) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  const user = usersService.update(+id, name);

  res.send(user);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
