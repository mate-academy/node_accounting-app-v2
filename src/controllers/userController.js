'use strict';

const services = require('../services/usersService');

const getAll = (req, res) => {
  res.statusCode = 200;
  res.send(services.getUsers());
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.send(400);
  }

  const newUser = services.createNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getOne = (req, res) => {
  const userId = Number(req.params.userId);

  const foundUser = services.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.setHeader('Content-Type', 'application/json');

  res.send(foundUser);
};

const update = (req, res) => {
  const userId = Number(req.params.userId);
  const { name } = req.body;

  const foundUser = services.getUserById(userId);

  if (!foundUser) {
    res.send(404);

    return;
  }

  services.updateUser(userId, name);

  res.send(foundUser);
};

const remove = (req, res) => {
  const userId = Number(req.params.userId);

  const usersLength = services.getUsers().length;

  const filteredUsers = services.removeUser(userId);

  if (filteredUsers.length === usersLength) {
    res.send(404);

    return;
  }

  res.send(204);
};

module.exports = {
  getAll,
  add,
  getOne,
  update,
  remove,
};
