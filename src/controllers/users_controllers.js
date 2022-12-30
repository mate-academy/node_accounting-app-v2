'use strict';

const { userServices } = require('../services/users_services');

const getAllUsers = (req, res) => {
  res.status(200).send(userServices.getAll());
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.add(name);

  res.status(201).send(newUser);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const foundUser = userServices.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const foundUser = userServices.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  userServices.remove(id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;

  const foundUser = userServices.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  userServices.update(id, name);
  res.status(200).send(foundUser);
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  removeUser,
  updateUser,
  userServices,
};
