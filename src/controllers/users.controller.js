'use strict';

const service = require('../services/users.service');

const get = (req, res) => {
  res.send(service.getAll());
};

const post = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: +new Date(),
    name,
  };

  service.add(newUser);

  res.statusCode = 201;

  res.send(newUser);
};

const getUser = (req, res) => {
  const searchedUser = service.getById(+req.params.id);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  if (!req.params.id) {
    res.sendStatus(400);

    return;
  }

  res.send(searchedUser);
};

const removeUser = (req, res) => {
  const hasUser = service.getById(+req.params.id);

  if (!hasUser) {
    res.sendStatus(404);

    return;
  }

  service.remove(+req.params.id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  if (!req.body || !req.params.id) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = service.update(+req.params.id, req.body.name);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  res.send(userToUpdate);
};

module.exports = {
  get,
  post,
  getUser,
  removeUser,
  updateUser,
};
