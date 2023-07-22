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
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    // eslint-disable-next-line no-useless-return
    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    // eslint-disable-next-line no-useless-return
    return;
  }

  const newUser = userService.create(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const isSuccsesfulDelete = userService.remove(userId);

  if (!isSuccsesfulDelete) {
    res.sendStatus(404);

    // eslint-disable-next-line no-useless-return
    return;
  }

  res.sendStatus(204);
};

const edit = (req, res) => {
  const { userId } = req.params;
  const editData = req.body;

  if (!userId || isNaN(Number(userId))) {
    res.sendStatus(400);

    return;
  }

  const editedUser = userService.edit(userId, editData);

  if (!editedUser) {
    res.sendStatus(404);

    // eslint-disable-next-line no-useless-return
    return;
  }

  res.send(editedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit,
};
