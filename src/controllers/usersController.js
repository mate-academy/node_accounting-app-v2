'use strict';

const usersService = require('../services/users');

function getAll(req, res) {
  const users = usersService.getAll();

  res.send(users);
};

function getOne(req, res) {
  const { userId } = req.params;

  const foundUser = usersService.getbyId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

function remove(req, res) {
  const { userId } = req.params;

  const foundUser = usersService.getbyId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(userId);
  res.sendStatus(204);
};

function update(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersService.getbyId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.status(422);

    return;
  }

  const updatedUser = usersService.update(userId, name);

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
