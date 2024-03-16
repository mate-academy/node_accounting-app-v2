'use strict';

const userService = require('../services/user.service');
const { messages } = require('../types/messages');
const { statusCode } = require('../types/status.messages');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(+id);

  if (!user) {
    res.status(statusCode.notFound).send(messages.user.notFound);

    return;
  }

  res.status(statusCode.ok).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(statusCode.badRequest).send(messages.user.requiredFields);

    return;
  }

  const user = userService.create(name);

  res.status(statusCode.created).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = userService.remove(+id);

  if (!user) {
    res.status(statusCode.notFound).send(messages.user.notFound);

    return;
  }

  res.status(statusCode.deleted).send(messages.user.deleted);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(statusCode.badRequest).send(messages.user.requiredFields);

    return;
  }

  const user = userService.update(+id, name);

  if (!user) {
    res.status(statusCode.notFound).send('User not found');

    return;
  }

  res.status(statusCode.ok).send(user);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
