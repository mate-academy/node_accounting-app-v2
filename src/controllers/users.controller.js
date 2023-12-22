'use strict';

const usersService = require('../services/users.service');

const get = (req, res) => {
  res.statusCode = 200;
  res.send(usersService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(Number(id));

  if (!user) {
    res.sendStatus(404);
    res.send('User not found');

    return;
  }
  res.statusCode = 200;
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
    res.send('Field name not provided');

    return;
  }

  const user = usersService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getById(Number(id));

  if (!user) {
    res.sendStatus(404);
    res.send('User not found');

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);
    res.send('Field name may contain only string data');

    return;
  }

  const updatedUser = usersService.update({
    id, name,
  });

  res.statusCode = 200;
  res.send(updatedUser);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(Number(id))) {
    res.sendStatus(404);
    res.send('User not found');

    return;
  }

  usersService.deleteById(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getById,
  create,
  update,
  deleteById,
};
