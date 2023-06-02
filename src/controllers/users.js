'use strict';

const { createId } = require('../utils/createId.js');

const { UserModel } = require('../models/users.js');

const userModel = new UserModel(createId);

const getUsers = (req, res) => {
  const users = userModel.getUsers();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;

  const foundUser = userModel.getUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userModel.createUser(name);

  res.statusCode = 201;

  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (!Number(userId)) {
    res.sendStatus(204);

    return;
  }

  const foundUser = userModel.getUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userModel.removeUser(Number(userId));
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;

  if (!Number(userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userModel.getUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userModel.updateUser({
    id: Number(userId),
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getUsers,
  getUser,
  add,
  remove,
  update,
  userModel,
};
