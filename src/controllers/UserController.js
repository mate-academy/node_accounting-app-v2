'use strict';

const UserModel = require('../models/User');
const get = (req, res) => {
  const users = UserModel.get();

  res.send(users);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (id) {
    const user = UserModel.getById({ id: +id });

    if (user) {
      res.send(user);

      return;
    }

    res.sendStatus(404);

    return;
  }

  res.sendStatus(400);
};

const create = (req, res) => {
  const { name } = req.body;

  if (name) {
    const newUser = UserModel.create({ name });

    res.status(201).send(newUser);

    return;
  }

  res.sendStatus(400);
};

const remove = (req, res) => {
  const { id } = req.params;
  const userIndex = UserModel.remove({ id: +id });

  if (userIndex !== -1) {
    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (name) {
    const updatedUser = UserModel.update({
      id: +id, name,
    });

    if (updatedUser) {
      res.send(updatedUser);

      return;
    }

    res.sendStatus(404);

    return;
  }

  res.sendStatus(400);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
