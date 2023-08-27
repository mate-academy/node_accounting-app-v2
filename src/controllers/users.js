'use strict';

const userService = require('../services/users.js');

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('User not found');

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send('Fill required fileds');

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUserById = userService.getById(userId);

  if (!foundUserById) {
    res.statusCode = 404;
    res.end('User not found');

    return;
  }

  userService.remove(userId);

  res.sendStatus(204).send();
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUserById = userService.getById(userId);

  if (!foundUserById) {
    res.statusCode = 404;
    res.end('User not found');

    return;
  }

  const { name } = req.body;

  const updatedUser = userService.update(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
