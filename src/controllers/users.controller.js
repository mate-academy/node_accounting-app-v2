'use strict';

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
};

const usersService = require('../services/users.service');

const get = (req, res) => {
  res.send(usersService.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }

  usersService.deleteUser(id);

  res.sendStatus(HTTP_STATUS.NO_CONTENT);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(HTTP_STATUS.BAD_REQUEST);

    return;
  }

  const user = usersService.createUser(name);

  res.status(HTTP_STATUS.CREATED).send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS.UNPROCESSABLE_ENTITY);

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
