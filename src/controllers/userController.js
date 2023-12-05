'use strict';

const {
  getAllUsers,
  getAllUsersId,
  findUserById,
  createUser,
  updateUser,
  removeUser,
} = require('../services/userService.js');

const getUsers = (req, res) => {
  res.statusCode = 200;
  res.send(getAllUsers());
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.statusCode = 400;

    return res.send();
  }

  const newUser = createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getUserById = (req, res) => {
  const id = +req.params.id;

  if (id === undefined) {
    res.statusCode = 400;

    return res.send();
  }

  const allUsersId = getAllUsersId();

  if (!allUsersId.includes(id)) {
    res.statusCode = 404;

    return res.send();
  }

  const foundUser = findUserById(id);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const id = +req.params.id;

  if (id === undefined) {
    res.statusCode = 400;

    return res.send();
  }

  const allUsersId = getAllUsersId();

  if (!allUsersId.includes(id)) {
    res.statusCode = 404;

    return res.send();
  }

  removeUser(id);

  res.statusCode = 204;
  res.send();
};

const patchUser = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (id === undefined || !name || typeof name !== 'string') {
    res.statusCode = 400;

    return res.send();
  }

  const allUsersId = getAllUsersId();

  if (!allUsersId.includes(id)) {
    res.statusCode = 404;

    return res.send();
  }

  const updatedUser = updateUser(id, name);

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  getUsers,
  postUser,
  getUserById,
  deleteUser,
  patchUser,
};
