'use strict';

const userService = require('../services/user.service');

const get = (req, res) => {
  const allUsers = userService.getAll();

  res.send(allUsers);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const post = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.status(201).send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.updateUser(user, name);

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  post,
  update,
  remove,
};
