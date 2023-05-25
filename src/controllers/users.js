'use strict';

const { usersService } = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.sendStatus(400);
  }

  const user = usersService.getById(userId);

  if (!user) {
    return res
      .status(404).send({ message: `User with id ${userId} not found` });
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = usersService.create({ name });

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.sendStatus(400);
  }

  usersService.removeById(userId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!userId || !name) {
    return res.sendStatus(400);
  }

  const user = usersService.getById(userId);

  if (!user) {
    return res
      .status(404).send({ message: `User with id ${userId} not found` });
  }

  usersService.updateById(user, { name });

  res.send(user);
};

module.exports = {
  usersController: {
    getAll,
    getOne,
    add,
    remove,
    update,
  },
};
