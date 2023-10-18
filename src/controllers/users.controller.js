'use strict';

const usersSevice = require('../services/users.service');

const get = (req, res) => {
  res.send(usersSevice.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = usersSevice.getUserById(id);

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

  const newUser = usersSevice.addUser(name);

  res.status(201);
  res.send(newUser);
};

const patch = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const user = usersSevice.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersSevice.updateUser(id, name);

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersSevice.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  usersSevice.deleteUser(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  post,
  patch,
  remove,
};
