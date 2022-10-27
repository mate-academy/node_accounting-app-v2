'use strict';

const userServise = require('../services/users.js');

let nextId = 0;

function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: nextId++,
    name,
  };

  userServise.add(newUser);

  res.status(201).send(newUser);
};

function getAll(req, res) {
  const users = userServise.getAll();

  res.status(200).send(users);
};

function getById(req, res) {
  const userId = Number(req.params.id);

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServise.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundUser);
};

function update(req, res) {
  const userId = Number(req.params.id);

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServise.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServise.update(foundUser.id, { ...req.body });

  res.status(200).send(foundUser);
};

function remove(req, res) {
  const userId = Number(req.params.id);

  const foundUser = userServise.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServise.remove(foundUser.id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  add,
  getById,
  update,
  remove,
};
