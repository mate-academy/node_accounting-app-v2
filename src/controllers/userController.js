'use strict';

const { userService } = require('../services/userService.js');

function getAllUsers(req, res) {
  const users = userService.getUsers();

  res.status(200).send(users);
}

function getById(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundUser);
}

function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Please, provide a valid user');

    return;
  }

  const newUser = userService.addUser(name);

  res.status(201).send(newUser);
}

function remove(req, res) {
  const { userId } = req.params;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
}

function update(req, res) {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userService.updateUser(userId, name);

  res.status(200).send(updatedUser);
}

// const userController = new UserController();

module.exports = {
  getAllUsers,
  getById,
  add,
  remove,
  update,
  initUsers: () => userService.resetUsers(),
};
