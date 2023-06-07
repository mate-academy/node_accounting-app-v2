'use strict';

const userServices = require('../services/users');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundUser);
};

const createOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.createUser(name);

  res.status(201).send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.removeUser(userId);

  res.status(204).send();
};

const updateOne = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const updateUser = userServices.getById(userId);

  if (!updateUser) {
    res.sendStatus(404);

    return;
  }

  userServices.updateById(userId, name);

  res.status(200).send(updateUser);
};

module.exports = {
  getAll,
  getOne,
  createOne,
  removeUser,
  updateOne,
};
