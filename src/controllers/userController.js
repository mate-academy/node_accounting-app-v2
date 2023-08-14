'use strict';

const userServices = require('../services/userServices');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.status(201).send(newUser);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundUser = userServices.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  const existingUser = userServices.getUserById(id);

  if (!existingUser) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const existingUser = userServices.getUserById(id);

  if (!existingUser) {
    res.sendStatus(404);

    return;
  };

  if (!name) {
    res.sendStatus(422);

    return;
  };

  userServices.update(id, name);

  res.send(existingUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
