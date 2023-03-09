'use strict';

const usersServices = require('../services/users');

function getAll(req, res) {
  const users = usersServices.getAll();

  res.statusCode = 200;
  res.send(users);
}

function getOne(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
}

function addNewUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.createNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
}

function deleteUser(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersServices.deleteUser(userId);
  res.sendStatus(204);
}

function updateUserInfo(req, res) {
  const { userId } = req.params;
  const { name } = req.body;
  const invalidData = !userId || !name || (typeof name !== 'string');

  if (invalidData) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = usersServices.getUserById(userId);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersServices.updateUserInfo({
    id: userId,
    name,
  });

  res.statusCode = 200;
  res.send(updatedUser);
}

module.exports = {
  getAll,
  getOne,
  addNewUser,
  deleteUser,
  updateUserInfo,
};
