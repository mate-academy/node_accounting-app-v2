'use strict';

const usersService = require('../services/users.service');

const get = (req, res) => {
  res.send(usersService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.add(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersService.update(+id, name);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  const isUserDeleted = usersService.remove(+id);

  if (!isUserDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  add,
  update,
  remove,
};
