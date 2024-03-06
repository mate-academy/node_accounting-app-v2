'use strict';

const userService = require('../services/user.service');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const id = +req.params.id;

  const user = userService.getById(id);

  if (!user) {
    res.status(404).send('Not Found');

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  const newUser = userService.create({ name });

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const id = +req.params.id;

  const user = userService.getById(id);

  if (!user) {
    res.status(404).send('Not Found');

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    res.status(404).send('Not Found');

    return;
  }

  const updatedUser = userService.update(id, name);

  res.status(200).send(updatedUser);
};

module.exports = {
  get, getOne, create, remove, update,
};
