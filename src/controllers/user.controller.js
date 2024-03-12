'use strict';

const statusCode = require('../constants/statusCodes');
const userService = require('../services/user.service');
const { isIdValid } = require('../helpers/isIdValid');
const BAD_REQUEST_MESSAGE = 'Bad request';

const getUsers = (req, res) => {
  res.status(statusCode.OK);
  res.send(userService.getUsers());
};

const getUserById = (req, res) => {
  const { id } = req.params;

  if (!id || !isIdValid(id)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);

    return;
  }

  try {
    const user = userService.getUserById(+id);

    res.status(statusCode.OK);
    res.send(user);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);

    return;
  }

  res.status(statusCode.CREATED);
  res.send(userService.createUser(name));
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!isIdValid(id)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);
  }

  try {
    userService.deleteUser(+id);
    res.sendStatus(statusCode.NO_CONTENT);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

const changeUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!isIdValid(id) || typeof name !== 'string') {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);
  }

  try {
    const changedUser = userService.changeUser(name, +id);

    res.status(statusCode.OK);
    res.send(changedUser);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  changeUser,
  deleteUser,
  createUser,
};
