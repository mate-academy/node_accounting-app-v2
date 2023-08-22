'use strict';

const usersServices = require('../services/users.js');

const getUsers = async(req, res) => {
  const users = usersServices.getUsers();

  res
    .status(200)
    .send(users);
};

const getUser = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const user = await usersServices.getUser(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  };

  res
    .status(200)
    .send(user);
};

const deleteUser = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(404);

    return;
  }

  const userDeleted = usersServices.deleteUser(userId);

  if (!userDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersServices.addUser(name);

  res
    .status(201)
    .send(user);
};

const updateUser = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersServices.updateUser(userId, name);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res
    .status(200)
    .send(user);
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
};
