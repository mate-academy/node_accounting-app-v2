/* eslint-disable no-console */
'use strict';

const userService = require('../services/user.service');
const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  USER_NOT_FOUND_MESSAGE,
  MISSING_PARAM_MESSAGE,
} = require('../variables');

const get = (req, res) => {
  res.status(OK).send(userService.getAll());
};

const getOne = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userService.getById(userId);

  if (!user) {
    res.status(NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });

    return;
  }

  res.status(OK).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(BAD_REQUEST).send({ message: MISSING_PARAM_MESSAGE });

    return;
  }

  const user = userService.create(name);

  res.status(CREATED).send(user);
};

const update = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userService.getById(userId);
  const { name } = req.body;

  if (!user) {
    res.status(NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.update(userId, name);

  res.status(OK).send(updatedUser);
};

const remove = (req, res) => {
  const userId = parseInt(req.params.id);

  if (!userService.getById(userId)) {
    res.status(NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });

    return;
  }

  userService.remove(userId);

  res.status(NO_CONTENT).end();
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
