'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundedUser = userService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedUser);
};

const createOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createOne(name);

  res.statusCode = 201;
  res.send(newUser);
};

const updateOne = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundedUser = userService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.updateOne({
    id: userId,
    name,
  });

  res.send(updatedUser);
};

const deleteOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundedUser = userService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteOne(userId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
