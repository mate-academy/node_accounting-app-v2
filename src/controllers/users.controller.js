'use strict';

const userService = require('../services/users.service.js');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name field is required' });

    return;
  }

  if (!name) {
    res.status(400).json({ error: 'Name field is required' });

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(422).json({ error: 'Invalid "name" field' });

    return;
  }

  if (!name.trim()) {
    res.status(422).json({ error: 'Missing "name" field' });

    return;
  }

  userService.update({
    id: userId, name,
  });

  res.send(foundUser);
};

module.exports = {
  getAll, getOne, add, remove, update,
};
