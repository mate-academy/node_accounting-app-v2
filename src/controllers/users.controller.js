'use strict';

const service = require('../services/users.services');
const {
  OK,
  BAD_REQUEST,
  NOT_EXIST,
  CREATED,
  SUCCES_NO_CONTENT,
} = require('../statusCodes');

const getAllUsers = (req, res) => {
  res.statusCode = OK;
  res.send(service.getAll());
};

const getUser = (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.statusCode(BAD_REQUEST);

    return;
  }

  const searchedUser = service.getById(id);

  if (!searchedUser) {
    res.sendStatus(NOT_EXIST);

    return;
  }

  res.statusCode = OK;
  res.send(searchedUser);
};

const post = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const newUser = {
    id: Number(new Date()),
    name,
  };

  service.add(newUser);
  res.statusCode = CREATED;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const id = Number(req.params.id);
  const userToRemove = service.getById(id);

  if (!userToRemove) {
    res.sendStatus(NOT_EXIST);

    return;
  }

  service.remove(id);
  res.sendStatus(SUCCES_NO_CONTENT);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const id = Number(req.params.id);

  if (!name || !id) {
    res.statusCode(BAD_REQUEST);

    return;
  }

  const userToUpdate = service.update(id, name);

  if (!userToUpdate) {
    res.sendStatus(NOT_EXIST);

    return;
  }

  res.send(userToUpdate);
};

module.exports = {
  getAllUsers,
  getUser,
  post,
  removeUser,
  updateUser,
};
