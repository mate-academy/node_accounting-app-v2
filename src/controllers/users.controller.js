'use strict';

const usersService = require('../services/user.service');
const { STATUS_CODE } = require('../utils/constants');

const getAll = (req, res) => {
  const users = res.send(usersService.getAll());

  return users;
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = STATUS_CODE.CREATED_SUCCESS;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  const updateUser = usersService.update(id, name);

  res.send(updateUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(id)) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  usersService.remove(id);

  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
