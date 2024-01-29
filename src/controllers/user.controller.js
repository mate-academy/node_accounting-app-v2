'use strict';

const userService = require('../services/user.service.js');

const getAll = (req, res) => res.send(userService.getAll());

const create = (req, res) => {
  const { name } = req.body;

  const newUser = userService.create(name);

  res.status(201).send(newUser);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getById(id);

  res.send(foundUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedUser = userService.update(id, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
