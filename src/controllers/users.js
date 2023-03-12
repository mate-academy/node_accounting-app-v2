'use strict';

const userServices = require('../services/users');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
  res.sendStatus(200);
};

const addNewUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.addNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.deleteUser(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const invalidName = !name || typeof name !== 'string';

  if (invalidName || !userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userServices.updateUser(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  addNewUser,
  deleteUser,
  updateUser,
};
