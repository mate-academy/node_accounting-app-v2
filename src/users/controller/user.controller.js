'use strict';

const userService = require('../services/user.service').services;

function get(req, res) {
  res.send(userService.getUsers());
}

function post(req, res) {
  const {
    name,
  } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(userService.createUser(name));
}

function getById(req, res) {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getOneUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
}

function deleteUser(req, res) {
  const { id } = req.params;

  if (!userService.getOneUser(id)) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);

  res.sendStatus(204);
}

function patch(req, res) {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = userService.getOneUser(id);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  res.send(userService.updateUser(userToUpdate, req.body));
}

const controller = {
  get,
  post,
  getById,
  deleteUser,
  patch,
};

module.exports = {
  controller,
};
