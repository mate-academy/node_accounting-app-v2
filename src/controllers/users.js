'use strict';

const usersService = require('../servises/users.js');

function getAll(req, res) {
  const users = usersService.getAll();

  res.send(users);
}

function create(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
}

function getById(req, res) {
  const { userId } = req.params;

  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

function remove(req, res) {
  const { userId } = req.params;
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(userId);

  res.statusCode = 204;
  res.send('User deleted');
}

function update(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.update(userId, name);

  res.send(foundUser);
}

module.exports = {
  getAll,
  create,
  remove,
  update,
  getById,
};
