'use strict';

const { usersService } = require('../services/users.service');

const getAll = (_, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const foundedUser = usersService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundedUser = usersService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  const users = usersService.remove(userId);

  res.send(users);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundedUser = usersService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  usersService.update({
    userId, name,
  });

  res.send(foundedUser);
};

const usersController = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports = { usersController };
