'use strict';

const userServices = require('../services/user.service');
const codeStatuses = require('../variables');

const get = (_, res) => {
  res.send(userServices.getAll());
};

const getById = (req, res) => {
  const {
    userId,
  } = req.params;

  const user = userServices.getById(userId);

  if (!user) {
    res.sendStatus(codeStatuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  res.send(user);
};

const update = (req, res) => {
  const {
    userId,
  } = req.params;
  const {
    name,
  } = req.body;
  const choosedUser = userServices.getById(userId);

  if (!choosedUser) {
    res.sendStatus(codeStatuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  const updatedUser = userServices.update(
    userId,
    name,
  );

  res.send(updatedUser);
};

const create = (req, res) => {
  const {
    name,
  } = req.body;

  if (!name) {
    res.sendStatus(codeStatuses.BAD_REQUEST_CODE_STATUS);

    return;
  }

  userServices.create(name);

  res.status(codeStatuses.CREATED_CODE_STATUS).send(userServices.create(name));
};

const remove = (req, res) => {
  const {
    userId,
  } = req.params;

  if (!userServices.getById(userId)) {
    res.sendStatus(codeStatuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  userServices.remove(userId);

  res.sendStatus(codeStatuses.UNDERSTANDING_CODE_STATUS);
};

module.exports = {
  get,
  getById,
  update,
  create,
  remove,
};
