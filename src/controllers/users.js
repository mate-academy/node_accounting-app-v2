'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;

  if (isNaN(Number(userId))) {
    res.status(400).send('Bad Request. User id must be a number');

    return;
  }

  const foundUser = usersService.getById(Number(userId));

  if (!foundUser) {
    res.status(404).send('Not Found. User with this id does not exist');

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400)
      .send('Bad Request. User name should contain at least one letter');

    return;
  }

  const newUser = usersService.create(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (isNaN(Number(userId))) {
    res.status(400).send('Bad Request. User id must be a number');

    return;
  }

  const foundUser = usersService.getById(Number(userId));

  if (!foundUser) {
    res.status(404).send('Not Found. User with this id does not exist');

    return;
  }

  usersService.remove(Number(userId));
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;

  if (isNaN(Number(userId))) {
    res.status(400).send('Bad Request. User id must be a number');

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400)
      .send('Bad Request. User name should contain at least one letter');

    return;
  }

  const foundUser = usersService.getById(Number(userId));

  if (!foundUser) {
    res.status(404).send('Not Found. User with this id does not exist');

    return;
  }

  const updatedUser = usersService.update(Number(userId), name);

  res.send(updatedUser);
};

module.exports = {
  getAll, getById, create, remove, update,
};
