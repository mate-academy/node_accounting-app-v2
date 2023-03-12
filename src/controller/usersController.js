'use strict';

const { usersServices } = require('../services/usersServices');

const getAllUsers = (req, res) => {
  const users = usersServices.getAllUsers();

  res.send(users);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(usersServices.addUser(name));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServices.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const isUserDeleted = usersServices.deleteUser(+userId);

  if (!isUserDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  usersServices.updateUser(+userId, name);
  res.send(foundUser);
};

module.exports = {
  usersController: {
    getAllUsers,
    addUser,
    getUser,
    deleteUser,
    updateUser,
  },
};
