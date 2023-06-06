'use strict';

const userServices = require('../services/userServices');

const getAllUsers = (_, res) => {
  const allUsers = userServices.getAllUsers();

  res.send(allUsers);
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const user = userServices.getByUserId(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.createUser(name);

  res.status(201).send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  const foundUser = userServices.getByUserId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.deleteUser(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const user = userServices.getByUserId(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  userServices.updateUser(userId, name);
  res.status(200).send(userServices.updateUser(userId, name));
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
