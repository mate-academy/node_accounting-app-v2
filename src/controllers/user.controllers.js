'use strict';

const constants = require('../constants.js');
const userServise = require('../services/user.service.js');

const {
  SUCCESS_CODE,
  NOT_FOUND_CODE,
  SUCCESSFULLY_CREATED_CODE,
  BAD_REQUEST_CODE,
  COMPLETED_NO_CONTENT_CODE,
  UNPROCESSABLE_ENTITY_CODE,
  NOT_FOUND_USER_MESSAGE,
  NOT_FOUND_USERS_MESSAGE,
  UNPROCESSABLE_ENTITY_MESSAGE,
} = constants;

const {
  getUsers,
  addNewUser,
  getUserById,
  deleteUser,
  updateUser,
} = userServise;

const get = (req, res) => {
  const users = getUsers();

  if (!users) {
    res.status(NOT_FOUND_CODE);
    res.send(NOT_FOUND_USERS_MESSAGE);
  }
  res.status(SUCCESS_CODE);
  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const requestedUser = getUserById(id);

  if (!requestedUser) {
    res.status(NOT_FOUND_CODE);
    res.send(NOT_FOUND_USER_MESSAGE);

    return;
  }

  res.send(requestedUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(BAD_REQUEST_CODE);
    res.send(UNPROCESSABLE_ENTITY_MESSAGE);

    return;
  }

  const newUser = addNewUser(name);

  res.status(SUCCESSFULLY_CREATED_CODE);
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const userToDelete = getUserById(id);

  if (!userToDelete) {
    res.status(NOT_FOUND_CODE);
    res.send(NOT_FOUND_USER_MESSAGE);

    return;
  }

  deleteUser(userToDelete.id);
  res.sendStatus(COMPLETED_NO_CONTENT_CODE);
};

const update = (req, res) => {
  const { id } = req.params;
  const userToUpdate = getUserById(id);
  const { name } = req.body;

  if (!userToUpdate) {
    res.status(NOT_FOUND_CODE);
    res.send(NOT_FOUND_USER_MESSAGE);

    return;
  }

  if (typeof name !== 'string') {
    res.status(UNPROCESSABLE_ENTITY_CODE);
    res.send(UNPROCESSABLE_ENTITY_MESSAGE);

    return;
  }

  const updatedUser = updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
