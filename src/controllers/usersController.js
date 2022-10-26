'use strict';

const userService = require('../services/usersService.js');

function getAllUsers(req, res) {
  const users = userService.getAll();

  if (!users) {
    res.send([]);

    return;
  }

  res.statusCode = 200;
  res.send(users);
};

function getUser(req, res) {
  const { userId } = req.params;

  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

function addUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const id = new Date() * Math.random();

  const newUser = {
    ...req.body,
    id,
  };

  userService.add(newUser);

  res.statusCode = 201;
  res.send(newUser);
};

function deleteUser(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+userId);
  res.sendStatus(204);
};

function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.update(foundUser, { name });

  res.statusCode = 200;
  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
