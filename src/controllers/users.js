'use strict';

const collectionServices = require('../services/collections');
const usersServices = require('../services/users');

const getAllUsers = (req, res) => {
  res.send(collectionServices.getCollection().users);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.getUserById(userId);

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name || Object.keys(req.body).length > 1) {
    res.sendStatus(422);

    return;
  }

  const newUser = usersServices.createUser();

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersServices.deleteUser(userId);

  res.statusCode = 204;
  res.send(foundUser);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.getUserById(userId);

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  usersServices.updateUser(userId, name);
  res.statusCode = 200;
  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
  updateUser,
};
