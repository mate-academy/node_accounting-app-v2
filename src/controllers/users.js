'use strict';

const userServices = require('../services/users');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.status(201).res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userServices.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

const removeMany = (req, res) => {
  const { ids } = req.query;

  if (!Array.isArray(ids)) {
    res.sendStatus(422);

    return;
  }

  try {
    userServices.removeMany(ids);
  } catch (error) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateMany = (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    res.sendStatus(422);

    return;
  }

  const results = [];
  const errors = [];

  for (const { id, name } of items) {
    const foundUser = userServices.getById(id);

    if (foundUser) {
      userServices.update({
        id,
        name,
      });

      results.push({
        id,
        status: 'OK',
      });
    } else {
      errors.push({
        id,
        status: 'NOT FOUND',
      });
    }
  }

  res.sendStatus({
    results,
    errors,
  });
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
  removeMany,
  updateMany,
};
