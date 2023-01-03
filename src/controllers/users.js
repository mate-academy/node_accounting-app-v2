'use strict';

const usersServices = require('../services/users');

const getAll = (req, res) => {
  const users = usersServices.getUsers();

  res.send(users);
};

const findOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersServices.getUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.createUser(name);

  res.statusCode = 201;

  res.send(newUser);
};

const deleteOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersServices.getUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersServices.deleteUser(Number(userId));

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!userId || !name) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersServices.updateUser(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  findOne,
  addOne,
  deleteOne,
  updateOne,
};
