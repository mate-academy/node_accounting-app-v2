'use strict';

const { STATUS_MESSAGES } = require('../utils/constants');
const userServices = require('../services/users.services');

const getAll = (_req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  res.status(STATUS_MESSAGES.NEW_RESOURCE_CREATED)
    .send(userServices.createUser(name));
};

const getCurrentUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  res.send(foundUser);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  res.send(userServices.updateUser(userId, name));
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  userServices.removeUser(userId);

  res.sendStatus(STATUS_MESSAGES.ITEM_DELETED);
};

module.exports = {
  getAll,
  add,
  getCurrentUser,
  remove,
  update,
};
