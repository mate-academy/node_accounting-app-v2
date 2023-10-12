'use strict';

const userService = require('./../services/users.service');

const get = (req, res) => {
  res.send(userService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = {
    name,
    id: +new Date(),
  };

  userService.add(user);

  res.statusCode = 201;

  res.send(user);
};

const getOne = (req, res) => {
  const id = +req.params.id;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const deleteOne = (req, res) => {
  const id = +req.params.id;

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.removeById(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  res.send(userService.updateById(id, name));
};

module.exports = {
  get,
  create,
  getOne,
  deleteOne,
  update,
};
