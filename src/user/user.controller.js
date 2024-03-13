'use strict';

const HttpStatus = require('http-status-codes');

const {
  getAllUsers,
  getUserById,
  findUserToDelete,
  deleteUser,
  addUser,
} = require('../services/user.service');

const {
  INVALID_USER_ID,
  USER_NOT_FOUND,
} = require('../constants/errorMessages');

const get = (req, res) => {
  res.status(HttpStatus.OK).send(getAllUsers());
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.status(HttpStatus.BAD_REQUEST).send(INVALID_USER_ID);

    return;
  }

  const userFind = getUserById(userId);

  if (userFind) {
    res.send(userFind);
  } else {
    res.status(HttpStatus.NOT_FOUND).send(USER_NOT_FOUND);
  }
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(HttpStatus.BAD_REQUEST);

    return;
  }

  const user = {
    id: Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1)),
    name,
  };

  addUser(user);

  res.status(HttpStatus.CREATED).send(user);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  const userCheck = getUserById(userId);

  if (!userCheck) {
    res.status(HttpStatus.NOT_FOUND).send(USER_NOT_FOUND);

    return;
  }

  Object.assign(userCheck, { name });

  res.status(HttpStatus.OK).send(userCheck);
};

const deleteUserId = (req, res) => {
  const { userId } = req.params;

  const userToDelete = getUserById(userId);

  if (!userToDelete) {
    res.status(HttpStatus.NOT_FOUND).send(USER_NOT_FOUND);

    return;
  }

  const indexDeleteUser = findUserToDelete(userToDelete);

  deleteUser(indexDeleteUser);

  res.sendStatus(HttpStatus.NO_CONTENT);
};

module.exports = {
  get,
  getOne,
  createUser,
  updateUser,
  deleteUserId,
};
