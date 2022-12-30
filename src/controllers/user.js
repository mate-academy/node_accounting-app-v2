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

  const result = getUser(todoId);

  if (!result) {
    res.sendStatus(404);

    return;
  }

  res.send(result);
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

  const wasRemoved = deleteUser(userId);

  if (!wasRemoved) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateUserController = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || !userId) {
    res.sendStatus(400);

    return;
  }

  const wasUpdated = updateUser(userId, name);

  if (!wasUpdated) {
    res.sendStatus(404);

    return;
  }

  res.send(wasUpdated);
};

module.exports = {
  getAllController,
  getUserController,
  createNewUserController,
  deleteUserController,
  updateUserController,
};
