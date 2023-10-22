'use strict';

const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
} = require('../statusCode');
const userService = require('../services/users.services');

const getAllUsers = (req, res) => {
  res.statusCode = OK;
  res.send(userService.getAll());
};

const getUserById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = userService.getById(Number(id));

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.statusCode = OK;
  res.send(user);
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const newUser = {
    id: Number(new Date()),
    name,
  };

  userService.add(newUser);
  res.statusCode = CREATED;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(Number(id));

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  userService.remove(Number(id));
  res.sendStatus(NO_CONTENT);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const updatedUser = userService.update(Number(id), name);

  if (!updatedUser) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  deleteUser,
  updateUser,
};
