'use strict';

const userServices = require('../services/users');

function getAll(req, res) {
  const users = userServices.getAll();

  res.statusCode = 200;
  res.send(users);
}

function getOne(req, res) {
  const { userId } = req.params;

  if (!(userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
}

function addNew(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const newUser = userServices.addNew(name);

  res.statusCode = 201;
  res.send(newUser);
}

function remove(req, res) {
  const { userId } = req.params;

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(userId);
  res.sendStatus(204);
}

function change(req, res) {
  const { userId } = req.params;

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  userServices.change(userId, name);

  res.send(foundUser);
}

module.exports = {
  getOne,
  getAll,
  addNew,
  change,
  remove,
};
