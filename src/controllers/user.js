'use strict';

const {
  getAllUsers,
  getUser,
  createNewUser,
  deleteUser,
  updateUser,
} = require('../services/users');

const getAllController = (req, res) => {
  res.send(getAllUsers());
};

const getUserController = (req, res) => {
  const { todoId } = req.params;

  if (!getUser(todoId)) {
    res.sendStatus(404);

    return;
  }

  res.send(getUser(todoId));
};

const createNewUserController = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUserController = (req, res) => {
  const { userId } = req.params;

  const status = deleteUser(userId);

  if (status) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

const updateUserController = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || !userId) {
    res.sendStatus(400);

    return;
  }

  const status = updateUser(userId, name);

  if (status) {
    res.send(status);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  getAllController,
  getUserController,
  createNewUserController,
  deleteUserController,
  updateUserController,
};
