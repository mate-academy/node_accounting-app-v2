'use strict';

const userService = require('../services/user.service.js');
const statusesConstants = require('../../statusesConstants.js');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const id = Number(req.params.id);

  const user = userService.getById(id);

  res.setHeader('Content-type', 'application/json');

  if (!user) {
    res.sendStatus(statusesConstants.NOT_FOUND);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(statusesConstants.BAD_REQUEST);

    return;
  }

  const user = userService.create(name);

  res.statusCode = statusesConstants.CREATED;

  res.send(user);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user
    || typeof name !== 'string') {
    res.sendStatus(statusesConstants.NOT_FOUND);

    return;
  }

  const updatedUser = userService.update({
    id,
    name,
  });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  if (!userService.getById(id)) {
    res.sendStatus(statusesConstants.NOT_FOUND);

    return;
  }

  userService.remove(id);

  res.sendStatus(statusesConstants.NO_CONTENT);
};

module.exports = {
  get: getAll,
  getOne: getById,
  create,
  update,
  remove,
};
