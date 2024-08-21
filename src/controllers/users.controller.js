'use strict';

const usersService = require('../services/users.services.js');

const getAll = (req, res) => {
  res.status(200).send(usersService.getAll());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send({ message: 'Name is required' });

    return;
  }

  const newUser = usersService.createUser(name);

  res.status(201).send(newUser);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const currentUser = usersService.getUserById(+id);

  if (!currentUser) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.status(200).send(currentUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  const isRemoved = usersService.removeById(+id);

  if (!isRemoved) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Name is required' });

    return;
  }

  const updatedUser = usersService.updateById(+id, name);

  if (!updatedUser) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  createUser,
  getOne,
  remove,
  update,
};
