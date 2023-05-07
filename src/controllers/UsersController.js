'use strict';

const usersService = require('../services/UsersService');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const user = usersService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const user = usersService.getById(userId);

  if (!user) {
    req.sendStatus(404);

    return;
  }

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const user = usersService.getById(userId);
  const { name } = req.body;

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersService.update({
    id: userId,
    name,
  });

  res.send(user);
};

const removeMany = (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    res.sendStatus(422);

    return;
  }

  try {
    usersService.removeMany(ids);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

const updateMany = (req, res, next) => {
  if (req.query.action !== 'update') {
    next();

    return;
  }

  const { records } = req.body;

  if (!Array.isArray(records)) {
    res.sendStatus(422);

    return;
  }

  usersService.updateMany(records);
  res.sendStatus(200);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
  removeMany,
  updateMany,
};
