'use strict';

const usersService = require('../services/users');

const getUsers = async(req, res) => {
  const users = await usersService.getUsers();

  res.status(200).send(users);
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.addUser(name);

  res.status(201).send(user);
};

const getUserById = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const deleteUser = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const isDeleted = await usersService.deleteUser(userId);

  if (!isDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.updateUser(userId, name);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

module.exports = {
  getUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
};
