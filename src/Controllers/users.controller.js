'use strict';

const service = require('../services/users.service');
const { v4: uuidv4 } = require('uuid');

const get = (req, res) => {
  res.send(service.getAll());
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = service.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!id) {
    res.sendStatus(400);

    return;
  }

  res.send(user);
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: uuidv4(),
    name,
  };

  service.add(newUser);
  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = service.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  service.remove(id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id, name } = req.params;

  if (!req.body || !id) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = service.update(id, name);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  get,
  getUser,
  postUser,
  deleteUser,
  updateUser,
};
