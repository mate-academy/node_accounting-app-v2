'use strict';

const userServices = require('../services/users.services');

const getAll = (req, res) => {
  const users = userServices.findAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userServices.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.createOne(name);

  res.status(201).send(newUser);
};

const deleted = (req, res) => {
  const { id } = req.params;

  if (!userServices.getById(+id)) {
    return res.sendStatus(404);
  }

  userServices.deleteOne(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userServices.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!userServices.validate) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userServices.updateOne(user, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  deleted,
  update,
};
