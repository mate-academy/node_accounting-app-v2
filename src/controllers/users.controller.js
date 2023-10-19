'use strict';

const { UserServices } = require('../services/users.service');
const { STATUS_CODE } = require('../utils/constants');

const getUsers = (req, res) => {
  const users = UserServices.getUsers();

  if (!users) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_CODE.OK;
  res.send(users);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = UserServices.findUser(Number(id));

  if (!user) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_CODE.OK;
  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  const user = UserServices.createUser(name);

  res.status(STATUS_CODE.CREATED_SUCCESS);
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const user = UserServices.findUser(Number(id));

  if (!user) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  UserServices.deleteUser(Number(id));

  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = UserServices.findUser(Number(id));

  if (!user) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  UserServices.updateUser(user, name);

  res.send(user);
};

const UserController = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = {
  UserController,
};
