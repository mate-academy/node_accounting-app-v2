'use strict';

const {
  getUsers,
  addNewUser,
  findUser,
  findIndex,
  deleteOneUser,
  updateOneUser,
} = require('../services/user.service');

const getAllUsers = (req, res) => {
  res.status(200).json(getUsers());
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = addNewUser(name);

  res.status(201).json(newUser);
};

const getUser = (req, res) => {
  const { id } = req.params;
  const userResult = findUser(id);

  if (!userResult) {
    res.sendStatus(404);

    return;
  }

  res.send(userResult);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = findIndex(id);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }
  deleteOneUser(index);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const userIndex = findIndex(id);

  if (userIndex === -1) {
    res.sendStatus(404);

    return;
  }

  updateOneUser({
    userIndex, name,
  });

  const users = getUsers();

  res.status(200).json(users[userIndex]);
};

module.exports = {
  getAllUsers,
  postUser,
  getUser,
  deleteUser,
  updateUser,
};
