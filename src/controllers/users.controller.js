'use strict';

const usersServise = require('../servises/users.service');
const STATUS = require('../variables');

const getAll = (req, res) => {
  const users = usersServise.getAll();

  res.send(users);
};

const findUserById = (req, res) => {
  const { id } = req.params;

  const user = usersServise.getUser(id);

  if (!user) {
    res.sendStatus(STATUS.ERROR_NOT_FOUND);

    return;
  }
  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(STATUS.ERROR_BAD_REQUEST);

    return;
  }

  const user = usersServise.addNewUser(name);

  res.statusCode = STATUS.SUCCESSFUL_CREATED;
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const user = usersServise.getUser(id);

  if (!user) {
    res.sendStatus(STATUS.ERROR_NOT_FOUND);

    return;
  }

  usersServise.removeUser(id);

  res.sendStatus(STATUS.SUCCESSFUL_NO_CONTENT);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersServise.updateUser(id, name);

  if (!user) {
    res.sendStatus(STATUS.ERROR_NOT_FOUND);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(STATUS.ERROR_UNPROCESSABLE_ENTITY);

    return;
  }

  res.send(user);
};

module.exports = {
  getAll,
  findUserById,
  createUser,
  deleteUser,
  updateUser,
};
