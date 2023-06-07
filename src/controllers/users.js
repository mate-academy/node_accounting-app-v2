'use strict';

const usersServices = require('../services/users');

const getAll = (req, res) => {
  const users = usersServices.getAllUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersServices.createUser(name);

  res.status(201);
  res.send(user);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersServices.removeUser(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersServices.getUserById(userId);

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  usersServices.updateUser(foundUser, { name });

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
