'use strict';

const userServices = require('./services-users.js');

const getAll = (req, res) => {
  res.statusCode = 200;

  res.send(userServices.getAll());
};

const getUser = (req, res) => {
  const { userId } = req.params;

  if (!Number(userId) && +userId !== 0) {
    res.sendStatus(400);

    return;
  }

  const findedUser = userServices.getById(userId);

  if (!findedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(findedUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.statusCode = 201;

  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userServices.deleteUserById(userId)) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const updatedUser = userServices.getById(userId);

  if (!Number(userId) || !name) {
    res.sendStatus(400);

    return;
  }

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  Object.assign(updatedUser, { name });

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  getAll,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
