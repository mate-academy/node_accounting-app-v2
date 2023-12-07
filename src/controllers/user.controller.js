'use strict';

const userService = require('.././services/user.servise');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const foundUser = userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(404);
  }

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const foundUser = userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const newUser = userService.update(id, name);

  res.send(newUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
