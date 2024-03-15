'use strict';

const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const CREATED = 201;
const NO_CONTENT = 204;
const OK = 200;

const {
  getAllUsers,
  getUserById,
  findUserToDelete,
  deleteUser,
  addUser,
} = require('../services/user.service');

const get = (req, res) => {
  res.status(OK).send(getAllUsers());
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.status(BAD_REQUEST).send('Invalid user ID');

    return;
  }

  const userFind = getUserById(userId);

  if (userFind) {
    res.send(userFind);
  } else {
    res.status(NOT_FOUND).send('User not found');
  }
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = {
    id: Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1)),
    name,
  };

  addUser(user);

  res.status(CREATED).send(user);
};

const updateUser = (req, res) => {
  const { name } = req.body;

  const { userId } = req.params;

  const userCheck = getUserById(userId);

  if (!userCheck) {
    res.status(NOT_FOUND).send('User not found');

    return;
  }

  Object.assign(userCheck, { name });

  res.status(OK).send(userCheck);
};

const deleteUserId = (req, res) => {
  const { userId } = req.params;

  const userToDelete = getUserById(userId);

  if (!userToDelete) {
    res.status(NOT_FOUND).send('User not found');

    return;
  }

  const indexDeleteUser = findUserToDelete(userToDelete);

  deleteUser(indexDeleteUser);

  res.sendStatus(NO_CONTENT);
};

module.exports = {
  get,
  getOne,
  createUser,
  updateUser,
  deleteUserId,
};
