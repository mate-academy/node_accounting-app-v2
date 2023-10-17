'use strict';

const service = require('../services/users.services');

const getUser = (req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = service.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const getAllUsers = (req, res) => {
  res.statusCode = 200;
  res.send(service.getAll());
};

const postUser = (req, res) => {
  const { name } = req.body;

  const newUser = {
    id: +new Date(),
    name,
  };

  if (!name) {
    res.sendStatus(400);

    return;
  }

  service.add(newUser);
  res.statusCode = 201;
  res.send(newUser);
};

const updateUser = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!name || !id) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = service.update(id, name);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(updatedUser);
};

const deleteUser = (req, res) => {
  const id = +req.params.id;
  const user = service.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  service.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getUser,
  getAllUsers,
  postUser,
  updateUser,
  deleteUser,
};
