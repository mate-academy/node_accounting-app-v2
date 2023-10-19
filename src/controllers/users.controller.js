'use strict';

const usersSevice = require('../services/users.service');
const statusCodes = require('../constants/statusCodes');

const getAll = (req, res) => {
  res.send(usersSevice.getAllUsers());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = usersSevice.getUserById(id);

  if (!user) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.send(user);
};

const post = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const newUser = usersSevice.addUser(name);

  res.status(statusCodes.CREATED);
  res.send(newUser);
};

const patch = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const user = usersSevice.getUserById(id);

  if (!user) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  const updatedUser = usersSevice.updateUser(id, name);

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersSevice.getUserById(id)) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  usersSevice.deleteUser(id);
  res.sendStatus(statusCodes.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  post,
  patch,
  remove,
};
