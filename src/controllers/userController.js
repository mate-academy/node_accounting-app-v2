'use strict';

const { getMaxId } = require('../utils/helpers.js');
const usersServices = require('../services/usersServices.js');

const getAllUsers = (req, res) => {
  const users = usersServices.getAll();

  res.send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;
  const id = getMaxId(usersServices.getAll());

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = {
    id,
    name,
  };

  usersServices.createUser(newUser);

  return res.status(201).send(newUser);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.foundUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;

  const users = usersServices.getAll();

  const filteredUsers = users.filter(user => user.id !== Number(userId));

  if (users.length === filteredUsers.length) {
    res.sendStatus(404);

    return;
  }

  usersServices.changeAll(filteredUsers);
  res.sendStatus(204);
};

const changeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.foundUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  usersServices.changeOne(foundUser, name);
  res.send(foundUser);
};

module.exports = {
  createUser, getAllUsers, getOne, removeUser, changeUser,
};
