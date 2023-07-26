'use strict';

const { UserService } = require('../services/usersService');
const userService = new UserService();
const getAllUsersController = (req, res) => {
  const users = userService.getAll();

  res.statusCode = 200;
  res.send(users);
};

const getOneUserController = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getOne(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const createUserController = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUserController = (req, res) => {
  const { id } = req.params;
  const userShouldRemove = userService.getOne(id);

  if (!userShouldRemove) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

const updateUserController = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userShouldUpdate = userService.getOne(id);

  if (!userShouldUpdate) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(422);

    return;
  }

  userService.update(id, name);
  res.statusCode = 200;
  res.send(userShouldUpdate);
};

module.exports = {
  getAllUsersController,
  getOneUserController,
  createUserController,
  removeUserController,
  updateUserController,
};
