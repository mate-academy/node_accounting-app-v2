'use strict';

const usersService = require('./../services/users.service');

const get = (_, res) => {
  res.send(usersService.get());
};

const getOne = (req, res) => {
  const { id: idRaw } = req.params;
  const id = +idRaw;
  const user = usersService.getById(id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400).send('Incorrect name');

    return;
  }

  const user = usersService.create(name);

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id: idRaw } = req.params;
  const id = +idRaw;
  const user = usersService.getById(id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id: idRaw } = req.params;
  const id = +idRaw;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400).send('Incorrect name');

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  const updatedUser = usersService.update(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
