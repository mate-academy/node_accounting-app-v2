'use strict';

const userService = require('../services/user');
const { createErrorStatus } = require('../entity/createErrorStatus');

function getAll(req, res) {
  const users = userService.getAll();

  res.send(users);
};

function getOne(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    createErrorStatus(res, 404, 'userId');

    return;
  }

  res.send(foundUser);
}

function add(req, res) {
  const { name } = req.body;

  if (!name) {
    createErrorStatus(res, 400, 'name');
  }

  const newUser = userService.create(name);

  res.status(201).send(newUser);
}

function remove(req, res) {
  const { userId } = req.params;

  if (!userId) {
    createErrorStatus(res, 400, 'userId');

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
}

function update(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    createErrorStatus(res, 404, 'userId');

    return;
  }

  const updatedUser = userService.update({
    id: +userId,
    name: req.body.name,
  });

  res.status(200).send(updatedUser);
}

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
