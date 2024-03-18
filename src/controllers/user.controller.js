'use strict';

const { statusCode } = require('../helpers/statusCode');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  res.status(200);
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  res.status(statusCode.OK);
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(statusCode.BAD_REQUEST);

    return;
  }

  const user = userService.create(name);

  res.status(statusCode.CREATED);
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  userService.remove(+id);
  res.sendStatus(statusCode.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  const updatedUser = userService.update({ id, name });

  res.status(statusCode.OK);
  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
