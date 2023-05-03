'use strict';

const { UsersModel } = require('../models/users.js');

const getAll = (req, res) => {
  const users = UsersModel.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;

  if (isNaN(Number(userId))) {
    res.sendStatus(400);

    return;
  }

  const foundUser = UsersModel.getById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = UsersModel.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const isUserRemoved = UsersModel.removeUser(Number(userId));

  if (!isUserRemoved) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = UsersModel.updateUser(Number(userId), name);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
