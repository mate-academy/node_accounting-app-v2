'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addNewUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.createNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const invalidData = !userId || !name || (typeof name !== 'string');

  if (invalidData) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = usersService.getUserById(userId);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersService.updateUser({
    id: userId,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  addNewUser,
  deleteUser,
  updateUser,
};
