/* eslint-disable no-console */
/* eslint-disable no-useless-return */
'use strict';

const userService = require('../services/users.service');

const get = (req, res) => {
  const allUsers = userService.getAllUsers();

  if (!allUsers) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  res.send(allUsers);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  const user = userService.getUsersById(id);

  if (!user) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  const user = userService.createUser(name);

  if (!user) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !id) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  const user = userService.getUsersById(id);

  if (!user) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  if (typeof name !== 'string') {
    return res.sendStatus(422);
  }

  const updatedUser = userService.updateUser({
    id, name,
  });

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  const user = userService.getUsersById(id);

  if (!user) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  userService.removeUser(id);

  return res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
