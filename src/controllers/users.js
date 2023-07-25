'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (isNaN(Number(userId))) {
    res.status(400).send({ message: 'Invalid ID' });

    return;
  }

  if (!foundUser) {
    res.status(404).send({ message: 'User was not found' });

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Username was not provided.' });

    return;
  }

  const newUser = userService.create(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (!userService.getById(userId)) {
    res.status(404).send({ message: 'User not found' });

    return;
  }

  userService.remove(userId);

  res.sendStatus(204);
};

const edit = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!userService.getById(userId)) {
    res.status(404).send({ message: 'Cannot find user with this ID' });

    return;
  }

  if (!userId || !name) {
    res.status(400).send({ message: `Field 'name' cannot be empty` });

    return;
  }

  const editedUser = userService.edit(userId, req.body);

  res.send(editedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit,
};
