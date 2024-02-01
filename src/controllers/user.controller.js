'use strict';

const userService = require('./../services/user.service');

const get = async(req, res) => {
  res.send(userService.get());
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.create(name);

  res.status(201);
  res.send(user);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const user = userService.update(id, name);

  res.send(user);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const newUsers = userService.remove(id);

  res.sendStatus(204);
  res.send(newUsers);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
