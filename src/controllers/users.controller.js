'use strict';

const usersService = require('../services/users.service');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.json(users);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Bad request' });

    return;
  }

  const user = usersService.create({ name });

  res.status(201).json(user);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Bad request' });

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.json(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.status(400).json({ error: 'Bad request' });

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.status(404).json({ error: 'Not found' });

    return;
  }

  const updatedUser = usersService.update({ id, name });

  res.json(updatedUser);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
