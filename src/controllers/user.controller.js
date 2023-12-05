'use strict';

const userService = require('./../services/users.service');
const { notFoundResponse } = require('./../helpers/notFoundResponse');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    return notFoundResponse(res);
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `name` as a string.',
      });
  }

  const newUser = userService.create(name);

  return res.status(201).json(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    return notFoundResponse(res);
  }

  userService.remove(id);

  return res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!name || typeof name !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `name` as a string.',
      });
  }

  if (!user) {
    return notFoundResponse(res);
  }

  userService.update(id, name);

  return res.send(user);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
