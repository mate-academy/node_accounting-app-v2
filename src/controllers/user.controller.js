'use strict';

const {
  getAllUsers,
  getUserById,
  findUserToDelete,
  deleteUser,
  addUser,
} = require('../services/user.service');

const get = (req, res) => {
  res.status(200).send(getAllUsers());
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.status(400).send('Invalid user ID');

    return;
  }

  const userFind = getUserById(userId);

  if (userFind) {
    res.send(userFind);
  } else {
    res.status(404).send('User not found');
  }
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = {
    id: Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1)),
    name,
  };

  addUser(user);

  res.status(201).send(user);
};

const updateUser = (req, res) => {
  const { name } = req.body;

  const { userId } = req.params;

  const userCheck = getUserById(userId);

  if (!userCheck) {
    res.status(404).send('User not found');

    return;
  }

  Object.assign(userCheck, { name });

  res.status(200).send(userCheck);
};

const deleteUserId = (req, res) => {
  const { userId } = req.params;

  const userToDelete = getUserById(userId);

  if (!userToDelete) {
    res.status(404).send('User not found');

    return;
  }

  const indexDeleteUser = findUserToDelete(userToDelete);

  deleteUser(indexDeleteUser);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  createUser,
  updateUser,
  deleteUserId,
};
