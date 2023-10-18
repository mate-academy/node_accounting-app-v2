'use strict';

const {
  BAD_REQUEST,
  CREATED_SUCCESS,
  NOT_FOUND,
  NO_CONTENT_SUCCESS,
} = require('../../constants/statusCodes');
const usersService = require('./../services/users.service');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const newUser = {
    name,
    id: Number(new Date()),
  };

  const user = usersService.add(newUser);

  res.statusCode = CREATED_SUCCESS;

  res.send(user);
};

const getById = (req, res) => {
  const id = Number(req.params.id);

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  usersService.remove(id);

  res.sendStatus(NO_CONTENT_SUCCESS);
};

const update = (req, res) => {
  const id = Number(req.params.id);

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const { name } = req.body;

  const updatedUser = usersService.updateById(id, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
