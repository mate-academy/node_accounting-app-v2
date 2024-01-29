'use strict';

const userServices = require('../services/user.service');
const { validate } = require('../helpers/userValidation');

const getAll = (req, res) => {
  const users = userServices.findAll();

  res.send(users);
};

const getById = (req, res) => {
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

  const newUser = userServices.create(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userServices.getById(+id)) {
    return res.sendStatus(404);
  }

  userServices.remove(+id);

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

  if (!validate(name)) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userServices.update(user, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
