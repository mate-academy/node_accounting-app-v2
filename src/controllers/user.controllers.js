'use strict';

const userService = require('../services/user.services');

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

const MESSAGES = {
  USER_NOT_FOUND: 'User not found.',
  NAME_REQUIRED: 'Name is required.',
};

const getAllUsers = (req, res) => {
  const users = userService.getAll();

  res.status(STATUS_CODES.OK).send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .send({ error: MESSAGES.USER_NOT_FOUND });
  }

  res.status(STATUS_CODES.OK).send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .send({ error: MESSAGES.NAME_REQUIRED });
  }

  const newUser = userService.create(name);

  res.status(STATUS_CODES.CREATED).send(newUser);
};

const removeUserById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .send({ error: MESSAGES.USER_NOT_FOUND });
  }

  userService.removeById(id);
  res.sendStatus(STATUS_CODES.NO_CONTENT);
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(id);

  if (!user) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .send({ error: MESSAGES.USER_NOT_FOUND });
  }

  if (!name) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .send({ error: MESSAGES.NAME_REQUIRED });
  }

  const updatedUser = userService.updateById(id, name);

  res.status(STATUS_CODES.OK).send(updatedUser);
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  removeUserById,
};
