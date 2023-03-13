'use strict';

const usersService = require('../services/users');
const { ApiError } = require('../exceptions/ApiError');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    throw ApiError.NotFound();
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;
  const user = usersService.add(name);

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    throw ApiError.NotFound();
  }

  usersService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getById(id);

  if (!user) {
    throw ApiError.NotFound();
  }

  const updatedUser = usersService.update(id, { name });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
