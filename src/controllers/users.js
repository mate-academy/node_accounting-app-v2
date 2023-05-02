'use strict';

const { service: userService } = require('../services/users');

const getAll = (req, res) => {
  const foundUsers = userService.getAll();

  res.statusCode = 200;
  res.send(foundUsers);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
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
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeById(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.update(foundUser, req.body);

  res.statusCode = 200;
  res.send(foundUser);
};

const controller = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports.controller = controller;
