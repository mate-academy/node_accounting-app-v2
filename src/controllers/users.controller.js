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

const getOne = (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUser = usersService.getUserById(+id);

    res.status(200).send(currentUser);
  } catch (error) {
    next(error);
  }
};

const remove = (req, res, next) => {
  try {
    const { id } = req.params;

    usersService.removeById(+id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const update = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Name is required' });

    return;
  }

  try {
    const updatedUser = usersService.updateById(+id, name);

    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  createUser,
  getOne,
  remove,
  update,
};
