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
    notFoundResponse(res);
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

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    notFoundResponse(res);
  }

  userService.remove(id);
  res.sendStatus(204);
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
    notFoundResponse(res);
  }

  userService.update(id, name);

  res.send(user);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
