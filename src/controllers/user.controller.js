'use strict';

const usersService = require('../services/user.service');

const get = (req, res) => {
  res.send(usersService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;
  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const newUser = usersService.update({
    id,
    name,
  });

  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
