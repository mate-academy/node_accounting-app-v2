'use strict';

const { ERRORS } = require('../utils/constants');
const usersService = require('../services/users.service');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const id = Number(req.params.id);

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(ERRORS.NOT_FOUND);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(ERRORS.BAD_REQUEST);

    return;
  }

  const newUser = {
    name,
    id: Number(new Date()),
  };

  const user = usersService.add(newUser);

  res.statusCode = ERRORS.NEW_RESOURCE_CREATED;

  res.send(user);
};

const update = (req, res) => {
  const id = Number(req.params.id);

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(ERRORS.NOT_FOUND);

    return;
  }

  const { name } = req.body;

  const updatedUser = usersService.updateById(id, name);

  res.send(updatedUser);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(ERRORS.NOT_FOUND);

    return;
  }

  usersService.remove(id);

  res.sendStatus(ERRORS.NO_MESSAGE_BODY);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
