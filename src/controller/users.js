'use strict';

const usersServices = require('../services/usersServices');
const {
  NO_CONTENT, NOT_FOUND, BAD_REQUEST, STATUS_OK, STATUS_CREATED,
} = require('../utils/constants');

const getAll = (req, res) => {
  const users = usersServices.getAll();

  res.statusCode = STATUS_OK;
  res.send(users);
};

const getById = (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    res.sendStatus(BAD_REQUEST);
  }

  const foundUser = usersServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(NOT_FOUND);
    res.send('User not found');

    return;
  }

  res.statusCode = STATUS_OK;
  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);
    res.send('Fill all fields');

    return;
  }

  const newUser = usersServices.create(name);

  res.statusCode = STATUS_CREATED;
  res.send(newUser);
};

const remove = (req, res) => {
  const userId = Number(req.params.id);

  const user = usersServices.getById(userId);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  usersServices.remove(userId);
  res.sendStatus(NO_CONTENT);
};

const update = (req, res) => {
  const userId = Number(req.params.id);
  const { name } = req.body;

  if (!name || !userId) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const updatedUser = usersServices.update(userId, name);

  if (!updatedUser) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
