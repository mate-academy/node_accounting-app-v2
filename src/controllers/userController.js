'use strict';

const {
  findAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
  validate,
} = require('../services/userServices');

const getAll = (req, res) => {
  const users = findAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = getById(+id);

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

  const newUser = createOne(name);

  res.status(201).send(newUser);
};

const deleted = (req, res) => {
  const { id } = req.params;

  if (!getById(+id)) {
    return res.sendStatus(404);
  }

  deleteOne(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!validate) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = updateOne(user, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  deleted,
  update,
};
