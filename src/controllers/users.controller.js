'use strict';

const {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
} = require('../services/users.service');
const STATUS_CODES = require('../constants/statusCodes');

const getUsers = (req, res) => {
  const users = getAllUsers();

  res.send(users);
};

const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = getUserById(id);

  if (!foundUser) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const newUser = createUser(name);

  res.statusCode = STATUS_CODES.CREATED;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const foundUser = getUserById(id);

  if (!foundUser) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  removeUser(id);
  res.sendStatus(STATUS_CODES.NO_CONTENT);
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const foundUser = getUserById(id);

  if (!foundUser) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(STATUS_CODES.UNPROCESSABLE_ENTITY);

    return;
  }

  updateUser({
    id: id, name,
  });

  res.statusCode = STATUS_CODES.SUCCESS;

  res.send(foundUser);
};

module.exports = {
  getUsers,
  updateUserById,
  getUser,
  addUser,
  deleteUser,
};
