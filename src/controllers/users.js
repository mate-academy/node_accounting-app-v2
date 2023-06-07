'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getSingle = (req, res) => {
  const { userId, spentFor, title, amount, category } = req.params;
  const foundedUser = userService.getById(userId);

  const isValidData = foundedUser
    && typeof spentFor === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string';

  if (!isValidData) {
    res.sendStatus(400);

    return;
  }

  res.status(200);
  res.send(foundedUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundedUser = userService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+userId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundedUser = userService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userService.update({
    id: userId,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  add,
  getAll,
  getSingle,
  update,
  remove,
};
