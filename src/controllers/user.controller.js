'use strict';

const userService = require('../services/user.service');

const get = (req, res) => {
  const allUsers = userService.getAllUsers();

  res.send(allUsers);
};

const getOne = (req, res) => {
  const user = userService.getUserById(req.params.id);

  if (!user) {
    res.status(404).send('user not found');
  }

  res.send(user);
};

const create = (req, res) => {
  if (req.body.name === '' || !req.body.name) {
    res.status(400).send('name required!');

    return;
  }

  res.status(201).send(userService.createUser(req.body.name));
};

const remove = (req, res) => {
  const user = userService.getUserById(+req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(req.params.id);

  res.sendStatus(204);
};

const update = (req, res) => {
  if (!req.params.id) {
    res.status(400).send('id required!');
  }

  if (req.body.name === '') {
    res.status(400).send('name required!');
  }

  const user = userService.getUserById(req.params.id);

  if (!user) {
    res.status(404).send('user not found');

    return;
  }

  res.send(userService.updateUser(req.params.id, req.body.name));
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
