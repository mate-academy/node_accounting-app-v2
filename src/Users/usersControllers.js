'use strict';

const userServices = require('./usersServices');

const getAllUsers = (req, res) => {
  res.send(userServices.getAll());
};

const getOneUser = (req, res) => {
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

  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.status(201);
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!userId || !name) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
  updateUser,
};
