'use strict';

const userService = require('../services/users');
const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.statusMessage = 'Required parameter is not passed';
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusMessage = 'Expected entity doesn\'t exist';
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusMessage = 'Required parameter is not passed';
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.statusMessage = 'Required parameter is not passed';
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusMessage = 'Expected entity doesn\'t exist';
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;

  // if (!userId) {
  //   res.statusMessage = 'Required parameter is not passed';
  //   res.sendStatus(400);
  //
  //   return;
  // }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusMessage = 'Expected entity doesn\'t exist';
    res.sendStatus(404);

    return;
  }

  const fieldsForUpdate = req.body;

  userService.update({
    userId, fieldsForUpdate,
  });

  res.send(foundUser);
};

module.exports = {
  getAll, getOne, add, remove, update,
};
