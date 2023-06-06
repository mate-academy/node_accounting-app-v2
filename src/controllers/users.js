'use strict';

const userService = require('../services/users');

function getAll(req, res) {
  const users = userService.getAllUsers();

  res.send(users);
};

function getOne(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.status(201);
  res.send(newUser);
};

function remove(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(userId);

  res.sendStatus(204);
};

function update(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.updateUser(userId, req.body);

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
