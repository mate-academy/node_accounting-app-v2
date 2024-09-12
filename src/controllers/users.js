'use strict';

const usersService = require('../services/users');

function getAll(req, res) {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    return res.status(400).send('Id is required');
  }

  const user = usersService.getOne(parseInt(id));

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = usersService.add(name);

  res.status(201).send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = usersService.update(parseInt(id), name);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  const wasRemoved = usersService.remove(parseInt(id));

  if (!wasRemoved) {
    return res.status(404).send('User not found');
  }

  res.status(204).send('');
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
