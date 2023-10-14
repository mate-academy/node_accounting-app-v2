'use strict';

const service = require('../services/users.services');

const getAllUsers = (req, res) => {
  res.statusCode = 200;
  res.send(service.getAll());
};

const getUser = (req, res) => {
  const id = +req.params.id;
  const searcedUser = service.getById(id);

  if (!id) {
    res.statusCode(400);

    return;
  }

  if (!searcedUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(searcedUser);
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

const removeUser = (req, res) => {
  const id = +req.params.id;
  const userToRemove = service.getById(id);

  if (!userToRemove) {
    res.sendStatus(404);

    return;
  }

  service.remove(id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const id = +req.params.id;
  const userToUpdate = service.update(id, name);

  if (!name || !id) {
    res.statusCode(400);

    return;
  }

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  res.send(userToUpdate);
};

module.exports = {
  getAllUsers,
  getUser,
  post,
  removeUser,
  updateUser,
};
